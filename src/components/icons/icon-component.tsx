import React from 'react';
import { IconType } from 'react-icons';
import { IoCartOutline } from "react-icons/io5";
import { RxMoon } from "react-icons/rx";
import { AiOutlineMenu } from "react-icons/ai";
import { FiHome, FiSun } from "react-icons/fi";
import { RiFileList3Line } from "react-icons/ri";


interface IconComponentProps {
    iconName: string;
    size?: number;
    color?: string;
    className?: string;
}

const IconComponent: React.FC<IconComponentProps> = ({ iconName, size = 24, color = "black", className }) => {
    const icons: Record<string, IconType> = {
        home: FiHome,
        cart: IoCartOutline,
        order: RiFileList3Line,
        menu: AiOutlineMenu,
        moon: RxMoon,
        sun: FiSun,

    };

    const Icon = icons[iconName];

    return <Icon size={size} color={color} className={`${className}`} />;
};

export default IconComponent;