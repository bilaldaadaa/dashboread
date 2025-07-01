import type React from "react";
import type { Dispatch, MouseEventHandler, ReactNode, SetStateAction } from "react";


export interface AuthFormProps<T> {
    title: string;
    descriptions: string;
    inputs: Array<input>
    footer: { content: string, links: { url: string, content: string } };
    btn: string;
    setData: Dispatch<SetStateAction<T>>;
    width?: string;
    loading: boolean


}
interface input {
    label: string;
    type: string;
    placeholder?: string;
    name: string;
}

export interface logInData {
    email: string;
    password: string
}

export interface signUpData {
    first_name: string;
    last_name: string;
    user_name: string;
    email: string;
    password: string;
    password_confirmation: string;
    profile_image: Blob | null
}
export interface navBarProps {
    setMood: React.Dispatch<React.SetStateAction<boolean>>,
    image: string,
    setSerach: React.Dispatch<React.SetStateAction<string>>,
    mood: boolean
}

export interface cardProductProps {
    id: number
    image_url: string
    name: string
    price: string
    setDeleted?: Dispatch<SetStateAction<number>>
}

interface content {
    img: ReactNode;
    description: string,
    to: string
}
export interface sideBarProps {
    title: { part1: string, part2: string };
    contents: Array<content>;
    btn: { image: ReactNode, content: string };
}
export interface productsData {
    id: number;
    created_at?: string;
    image_url: string
    name: string
    price: string
    updated_at?: string
}
export interface AddEditFormProps {
    title: string
    setData: Dispatch<SetStateAction<dataAdd>>
    oldData?: cardProductProps
    loading: boolean
}

export interface dataAdd {
    name: string;
    price: string;
    image: Blob | null
}
export interface PopUpProps {
    description: string
    no?: MouseEventHandler<HTMLButtonElement>
    yes?: MouseEventHandler<HTMLButtonElement>
}