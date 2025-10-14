export type MessageItem = {
  id: string;
  name: string;
  time: string; // e.g., 9:00 AM
  unreadCount?: number;
  body: string;
  color?: string; // optional avatar bg override
  avatarUrl?: string; // optional profile image
};

const MessagesData: MessageItem[] = [
  {
    id: "m1",
    name: "Dr. Lila Ramirez",
    time: "9:00 AM",
    unreadCount: 0,
    body: "Please ensure the monthly attendance report is accurate before the April 30th deadline.",
    color: "#FFE3D3",
    avatarUrl: "https://i.pinimg.com/1200x/62/1d/66/621d6663d0f81f84373bf8d2fe4ca4b5.jpg",
  },
  {
    id: "m2",
    name: "Ms. Heather Morris",
    time: "10:15 AM",
    unreadCount: 4,
    body: "Don't forget the staff training on digital tools scheduled for May 5th at 3 PM in the...",
    color: "#FFF2B8",
    avatarUrl: "https://i.pinimg.com/736x/8d/95/03/8d9503a77e4c21ebf0ced6c252819a0e.jpg",
  },
  {
    id: "m3",
    name: "Mr. Carl Jenkins",
    time: "2:00 PM",
    unreadCount: 0,
    body: "Budget review meeting for the next fiscal year is on April 28th at 10 AM.",
    color: "#D9F1FF",
    avatarUrl: "https://i.pinimg.com/1200x/33/52/25/335225de2b04631b78a9be8bb8ee19e0.jpg",
  },
  {
    id: "m4",
    name: "Officer Dan Brooks",
    time: "3:10 PM",
    unreadCount: 2,
    body: "Review the updated security protocols effective May 1st. Familiarize yourself with...",
    color: "#FFE9CC",
    avatarUrl: "https://i.pinimg.com/736x/d1/81/e4/d181e44cf0a7d5f9190bc96939da4164.jpg",
  },
  {
    id: "m5",
    name: "Ms. Tina Goldberg",
    time: "5:00 PM",
    unreadCount: 6,
    body: "Reminder: Major IT system upgrade on May 8th from 1 PM to 4 PM.",
    color: "#E9F6FF",
    avatarUrl: "https://i.pinimg.com/736x/ff/45/66/ff456617ee20bdaceb126c9ad7522e9f.jpg",
  },
];

export default MessagesData;


