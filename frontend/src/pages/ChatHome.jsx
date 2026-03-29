import React, { useEffect, useState, useRef } from "react";
import { useProfile } from "../context/profileContext";
import axios from "axios";
import ChatMessages from "../components/Chat/ChatMessages";
import MessageInputForm from "../components/Chat/MessageInputForm";
import Nav from "../components/Chat/Nav";
import OnlineUsersList from "../components/Chat/OnlineUserList";
import TopBar from "../components/Chat/TopBar";
import { socketUrl } from "../../apiConfig";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { playNotificationSound } from "../utils/notificationSound";

const ChatHome = () => {
  const [ws, setWs] = useState(null);
  const [onlinePeople, setOnlinePeople] = useState({});
  const [offlinePeople, setOfflinePeople] = useState({});
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const { userDetails } = useProfile();
  const { isAuthenticated, checkAuth } = useAuth();
  const navigate = useNavigate();
  const typingTimeoutRef = useRef(null);
  const selectedUserIdRef = useRef(null);
  const wsRef = useRef(null);
  const reconnectTimerRef = useRef(null);

  // Keep ref in sync so WS handlers can read latest value
  useEffect(() => {
    selectedUserIdRef.current = selectedUserId;
    setIsTyping(false);
  }, [selectedUserId]);

  const showOnlinePeople = (peopleArray) => {
    const people = {};
    peopleArray.forEach(({ userId, username, avatarLink }) => {
      // Skip entries without userId (unauthenticated connections)
      if (!userId) return;
      // Skip self
      if (userId === userDetails?._id) return;
      people[userId] = { username, avatarLink };
    });
    setOnlinePeople(people);
  };

  // Single WebSocket connection with proper lifecycle
  useEffect(() => {
    let disposed = false;

    const connect = () => {
      if (disposed) return;
      const newWs = new WebSocket(socketUrl);

      newWs.addEventListener("open", () => {
        if (!disposed) {
          wsRef.current = newWs;
          setWs(newWs);
        }
      });

      newWs.addEventListener("close", () => {
        if (!disposed) {
          wsRef.current = null;
          setWs(null);
          // Reconnect after delay
          reconnectTimerRef.current = setTimeout(connect, 1000);
        }
      });
    };

    connect();

    return () => {
      disposed = true;
      if (reconnectTimerRef.current) clearTimeout(reconnectTimerRef.current);
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
    };
  }, [userDetails]);

  useEffect(() => {
    const fetchData = async () => {
      if (selectedUserId) {
        setLoadingMessages(true);
        try {
          const res = await axios.get(`/api/user/messages/${selectedUserId}`);
          setMessages(res.data);
        } catch (error) {
          console.error("Error fetching messages:", error);
        } finally {
          setLoadingMessages(false);
        }
      }
    };
    fetchData();
  }, [selectedUserId]);

  useEffect(() => {
    axios.get("/api/user/people").then((res) => {
      const offlinePeopleArr = res?.data
        .filter((p) => p._id !== userDetails?._id)
        .filter((p) => !onlinePeople[p._id]);

      const offlinePeopleWithAvatar = offlinePeopleArr.map((p) => ({
        ...p,
        avatarLink: p.avatarLink,
      }));

      setOfflinePeople(
        offlinePeopleWithAvatar.reduce((acc, p) => {
          acc[p._id] = p;
          return acc;
        }, {})
      );
    });
  }, [onlinePeople, userDetails]);

  useEffect(() => {
    const handleWsMessage = (event) => {
      const messageData = JSON.parse(event.data);

      // Online people list
      if ("online" in messageData) {
        showOnlinePeople(messageData.online);
        return;
      }

      // Typing indicators
      if ("typing" in messageData) {
        if (messageData.sender === selectedUserIdRef.current) {
          setIsTyping(messageData.typing);
        }
        return;
      }

      // Incoming text message
      if ("text" in messageData) {
        if (messageData.sender === selectedUserIdRef.current) {
          setMessages((prev) => [...prev, { ...messageData }]);
        }
        // Play sound for messages from others
        if (messageData.sender !== userDetails?._id) {
          playNotificationSound();
        }
      }
    };

    if (ws) {
      ws.addEventListener("message", handleWsMessage);
    }

    return () => {
      if (ws) {
        ws.removeEventListener("message", handleWsMessage);
      }
    };
  }, [ws, userDetails]);

  const sendMessage = (ev) => {
    if (ev) ev.preventDefault();
    if (!newMessage.trim() || !selectedUserId) return;
    const activeWs = wsRef.current;
    if (!activeWs || activeWs.readyState !== WebSocket.OPEN) return;
    activeWs.send(JSON.stringify({ text: newMessage, recipient: selectedUserId }));
    // Stop typing indicator
    activeWs.send(JSON.stringify({ typing: false, recipient: selectedUserId }));
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    setNewMessage("");
    setMessages((prev) => [
      ...prev,
      {
        text: newMessage,
        sender: userDetails._id,
        recipient: selectedUserId,
        _id: Date.now(),
        createdAt: new Date().toISOString(),
      },
    ]);
  };

  // Typing indicator: send typing event with debounce
  const handleTyping = () => {
    const activeWs = wsRef.current;
    if (activeWs?.readyState === WebSocket.OPEN && selectedUserId) {
      activeWs.send(JSON.stringify({ typing: true, recipient: selectedUserId }));
    }
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      const ws2 = wsRef.current;
      if (ws2?.readyState === WebSocket.OPEN && selectedUserId) {
        ws2.send(JSON.stringify({ typing: false, recipient: selectedUserId }));
      }
    }, 2000);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated]);

  return (
    <div className="flex h-screen bg-dark overflow-hidden relative">
      {/* Decorative background orbs */}
      <div className="orb w-96 h-96 bg-primary/30 -top-48 -right-48 fixed" />
      <div className="orb w-72 h-72 bg-accent/20 bottom-0 left-1/3 fixed" />

      <Nav />
      <OnlineUsersList
        onlinePeople={onlinePeople}
        selectedUserId={selectedUserId}
        setSelectedUserId={setSelectedUserId}
        offlinePeople={offlinePeople}
      />
      <section className="flex-1 flex flex-col bg-background relative overflow-hidden">
        {/* Subtle chat background pattern */}
        <div className="absolute inset-0 chat-pattern pointer-events-none" />

        <div className="relative flex-1 flex flex-col z-10 min-h-0">
          {selectedUserId && (
            <TopBar
              selectedUserId={selectedUserId}
              setSelectedUserId={setSelectedUserId}
              offlinePeople={offlinePeople}
              onlinePeople={onlinePeople}
              isTyping={isTyping}
            />
          )}
          <ChatMessages
            messages={messages}
            userDetails={userDetails}
            selectedUserId={selectedUserId}
            isTyping={isTyping}
            loadingMessages={loadingMessages}
          />
          <MessageInputForm
            newMessage={newMessage}
            setNewMessage={setNewMessage}
            sendMessage={sendMessage}
            selectedUserId={selectedUserId}
            onTyping={handleTyping}
          />
        </div>
      </section>
    </div>
  );
};

export default ChatHome;
