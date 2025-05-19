import { Home, LayoutDashboard, List, ScanQrCode, SquareMenu, Ticket, User } from "lucide-react";

export const navItems = [
    {
        name: "Home",
        link: "/",
        icon: Home
    },
    {
        name: "Dashboard",
        link: "/user/dashboard",
        icon: LayoutDashboard
    },
    {
        name: "Coupon",
        link: "/user/coupon",
        icon: Ticket
    }
];

export const adminNavItems = [
    {
        name: "Home",
        link: "/",
        icon: Home
    },
    {
        name: "Dashboard",
        link: "/admin/dashboard",
        icon: LayoutDashboard
    },
    {
        name: "Menu",
        link: "/admin/menu",
        icon: SquareMenu
    },
    {
        name: "Orders",
        link: "/admin/orders",
        icon: List
    },
    {
        name: "Users",
        link: "/admin/users",
        icon: User
    },
    {
        name: "Scanner",
        link: "/admin/scanner",
        icon:ScanQrCode
    }
];

export const dayOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

