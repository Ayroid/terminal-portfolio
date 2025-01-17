"use client";

import { useState, useEffect } from "react";

const UptimeCommand = () => {
  const [uptime, setUptime] = useState<string>("");

  useEffect(() => {
    const startTime = sessionStorage.getItem("terminal_start_time");
    const now = Date.now();

    let sessionStart: number;
    if (startTime) {
      sessionStart = parseInt(startTime, 10);
    } else {
      sessionStart = now;
      sessionStorage.setItem("terminal_start_time", now.toString());
    }

    const diff = now - sessionStart;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    let uptimeStr = "";
    if (days > 0) uptimeStr += `${days} day${days > 1 ? "s" : ""}, `;
    if (hours % 24 > 0) uptimeStr += `${hours % 24} hour${hours % 24 > 1 ? "s" : ""}, `;
    if (minutes % 60 > 0) uptimeStr += `${minutes % 60} min${minutes % 60 > 1 ? "s" : ""}, `;
    uptimeStr += `${seconds % 60} sec`;

    const currentTime = new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

    setUptime(`${currentTime} up ${uptimeStr}, 1 user, load average: 0.42, 0.38, 0.35`);
  }, []);

  return <div className="text-foreground font-hack">{uptime}</div>;
};

export default UptimeCommand;
