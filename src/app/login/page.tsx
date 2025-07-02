"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Cinzel } from "next/font/google";

import BarbershopIcon from "../../../public/barbershop-icon.png";

const cinzel = Cinzel({
    weight: ["400", "500", "600", "700"],
    subsets: ["latin"],
})

const loginFormSchema = z.object({
    customerName: z.string(),
    customerEmail: z.string().email(),
    customerPassword: z.string(),
});

type LoginFormData = z.infer<typeof loginFormSchema>;

export default function LoginPage() {
    const {
        register,
        formState,
        handleSubmit,
    } = useForm({
        resolver: zodResolver(loginFormSchema),
    });

    async function onFormSubmit(data: LoginFormData) {
        
    }

    return (
        <main className="flex justify-center items-center w-full min-h-screen">
            <section className="w-sm bg-secondary p-4 rounded shadow-xl shadow-[rgba(0,0,0,0.3)] m-2">
                <div className="flex items-center justify-between mb-4">
                    <h1 className={`${cinzel.className} text-2xl sm:text-3xl text-span`}>
                        Entrar
                    </h1>

                    <Image
                        src={BarbershopIcon}
                        alt="Barbershop Icon"
                        className="w-25 h-25 object-cover"
                        priority={true}
                    />
                </div>

                <form className="flex flex-col gap-3">
                    <div>
                        <label htmlFor="customerEmail" className={`${cinzel.className}`}>
                            E-mail
                        </label>
                        <input
                            id="customerEmail"
                            type="email"
                            {...register("customerEmail")}
                            placeholder="Digite seu e-mail"
                            className="bg-background/50 p-2 rounded w-full"
                        />
                    </div>

                    <div>
                        <label htmlFor="customerPassword" className={`${cinzel.className}`}>
                            Senha
                        </label>
                        <input
                            id="customerPassword"
                            type="password"
                            {...register("customerPassword")}
                            placeholder="Digite sua senha"
                            className="bg-background/50 p-2 rounded w-full"
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-span font-bold tracking-wider p-3 rounded w-full mt-2 mb-4 cursor-pointer hover:bg-span/90"
                        onClick={handleSubmit(onFormSubmit)}
                    >
                        Entrar
                    </button>
                </form>

                <p className="text-center">
                    Ainda não possui uma conta?{" "}
                    <a href="/register" className="text-span font-bold hover:underline">
                        Cadastre-se
                    </a>
                </p>
            </section>
        </main>
    );
}