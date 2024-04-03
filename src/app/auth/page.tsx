'use client';
import {useRouter} from "next/navigation";

export default function Page() {
    const router = useRouter()
    const OnAuth = (user: any) => {
        if (!user || !user.hash) {
            return
        }

        if (typeof document !== 'undefined') {
            const date = new Date();
            //1 day
            date.setTime(date.getTime() + (24 * 60 * 60 * 1000));

            const expires = `expires=${date.toUTCString()}`;

            document.cookie =`userHash=${user.hash}; ${expires}; path=/`;
        }

        router.push('/')
    }

    return (
        <div
            ref={(component) => {
                if (!component) {
                    return
                }

                // @ts-ignore
                window['TelegramLoginWidget'] = {
                    OnAuth: (user: any) => OnAuth(user),
                }

                const script = document.createElement("script");

                script.src = "https://telegram.org/js/telegram-widget.js?22";
                script.setAttribute("data-telegram-login", 'TonNftTestBot');
                script.setAttribute("data-size", 'medium');
                script.setAttribute("data-request-access", 'write');
                script.setAttribute(
                    "data-onauth",
                    "TelegramLoginWidget.OnAuth(user)"
                );
                script.async = true;
                component.appendChild(script);
            }}
        >

        </div>
    );
}
