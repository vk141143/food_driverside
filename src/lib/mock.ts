export type OrderStatus = "incoming" | "pickup" | "delivery" | "completed";

export interface DriverOrder {
  id: string;
  restaurant: { name: string; address: string; distanceKm: number; phone: string };
  customer: { name: string; address: string; distanceKm: number; phone: string };
  items: number;
  orderValue: number;
  deliveryFee: number;
  earnings: number;
  estMinutes: number;
  paymentMethod: "UPI" | "Cash" | "Card";
  pickupOtp: string;
  deliveryOtp: string;
  instructions?: string;
  status: OrderStatus;
}

export const driver = {
  name: "John Miller",
  firstName: "John",
  phone: "+91 98765 43210",
  email: "john@driverportal.app",
  photo: "https://i.pravatar.cc/160?img=12",
  vehicle: "Honda Activa · MH 12 AB 1234",
  rating: 4.8,
  acceptanceRate: 96,
  completionRate: 98,
};

export const incomingOrders: DriverOrder[] = [
  {
    id: "ORD-8842",
    restaurant: { name: "Burger Republic", address: "MG Road, Sector 14", distanceKm: 1.2, phone: "+911111" },
    customer: { name: "Anita R.", address: "Rose Villa, Wing B, Flat 402", distanceKm: 2.4, phone: "+912222" },
    items: 3,
    orderValue: 540,
    deliveryFee: 45,
    earnings: 78,
    estMinutes: 22,
    paymentMethod: "UPI",
    pickupOtp: "4471",
    deliveryOtp: "9023",
    instructions: "Ring the bell twice.",
    status: "incoming",
  },
  {
    id: "ORD-8843",
    restaurant: { name: "Sushi Nine", address: "Linking Rd, Bandra West", distanceKm: 0.8, phone: "+911111" },
    customer: { name: "Rahul S.", address: "Palm Heights, Tower 3", distanceKm: 3.1, phone: "+912222" },
    items: 2,
    orderValue: 890,
    deliveryFee: 60,
    earnings: 95,
    estMinutes: 28,
    paymentMethod: "Card",
    pickupOtp: "2210",
    deliveryOtp: "6674",
    status: "incoming",
  },
];

export const history: (DriverOrder & { completedAt: string; rating: number })[] = [
  { ...incomingOrders[0], id: "ORD-8801", status: "completed", completedAt: "Today · 12:40", rating: 5 },
  { ...incomingOrders[1], id: "ORD-8790", status: "completed", completedAt: "Today · 10:15", rating: 5 },
  { ...incomingOrders[0], id: "ORD-8721", status: "completed", completedAt: "Yesterday · 21:02", rating: 4 },
  { ...incomingOrders[1], id: "ORD-8688", status: "completed", completedAt: "Yesterday · 18:44", rating: 5 },
];

export const earnings = {
  today: 642,
  week: 4380,
  month: 18240,
  pending: 980,
  deliveries: 9,
  avgPerOrder: 71,
  tips: 120,
  bonus: 180,
  chart: [220, 320, 260, 410, 380, 520, 642],
};

export const notifications = [
  { id: 1, title: "New order available", body: "Burger Republic · 1.2 km away", time: "just now", type: "order" as const },
  { id: 2, title: "Peak hour bonus unlocked", body: "Complete 3 more orders to earn ₹150", time: "20m ago", type: "bonus" as const },
  { id: 3, title: "Weekly payout processed", body: "₹4,380 sent to your bank ****4212", time: "2h ago", type: "payment" as const },
  { id: 4, title: "Rating received", body: "Anita R. rated your delivery 5★", time: "Yesterday", type: "system" as const },
];