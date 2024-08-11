import React from 'react';
import { IconType } from 'react-icons';
import { RxMoon } from "react-icons/rx";
import { AiOutlineMenu } from "react-icons/ai";
import { FiHome, FiSun } from "react-icons/fi";
import { RiFileList3Line } from "react-icons/ri";
import { FiShoppingCart } from "react-icons/fi";


interface IconComponentProps {
    iconName: string;
    size?: number;
    color?: string;
    className?: string;
}

const IconComponent: React.FC<IconComponentProps> = ({ iconName, size = 24, color = "black", className }) => {
    const icons: Record<string, IconType> = {
        home: FiHome,
        cart: FiShoppingCart,
        order: RiFileList3Line,
        menu: AiOutlineMenu,
        moon: RxMoon,
        sun: FiSun,

    };

    const Icon = icons[iconName];

    return <Icon size={size} color={color} className={`${className}`} />;
};

export default IconComponent;