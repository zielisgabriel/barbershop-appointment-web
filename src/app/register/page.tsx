"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Cinzel } from "next/font/google";

import BarbershopIcon from "../../../public/barbershop-icon.png";
import toast from "react-hot-toast";

const cinzel = Cinzel({
    weight: ["400", "500", "600", "700"],
    subsets: ["latin"],
})

const registerFormSchema = z.object({
    customerName: z.string(),
    customerEmail: z.string().email(),
    customerPassword: z.string(),
});

export type RegisterFormData = z.infer<typeof registerFormSchema>;

export default function RegisterPage() {
    const {
        register,
        formState,
        handleSubmit,
    } = useForm({
        resolver: zodResolver(registerFormSchema),
    });

    async function onFormSubmit(data: RegisterFormData) {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/customer/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })

            if (response.status !== 201) {
                const dataJson = await response.json();

                throw new Error(dataJson.message);
            }

            toast.success("Cadastro realizado com sucesso!", {
                style: {
                    background: "var(--span)",
                    color: "var(--foreground)",
                    fontWeight: "600",
                }
            });
        } catch (error: any) {
            toast.error(error.message, {
                style: {
                    background: "var(--span)",
                    color: "var(--foreground)",
                    fontWeight: "600",
                }
            });
        }
    }

    return (
        <main className="flex justify-center items-center w-full min-h-screen">
            <section className="w-sm bg-secondary p-4 rounded shadow-xl shadow-[rgba(0,0,0,0.3)] m-2">
                <div className="flex items-center justify-between mb-4">
                    <h1 className={`${cinzel.className} text-2xl sm:text-3xl text-span`}>
                        Cadastra-se
                    </h1>

                    <Image
                        src={BarbershopIcon}
                        alt="Barbershop Icon"
                        className="w-25 h-25 object-cover"
                        priority={true}
                    />
                </div>

                <form
                    onSubmit={handleSubmit(onFormSubmit)}
                    className="flex flex-col gap-3"
                >
                    <div>
                        <label htmlFor="customerName" className={`${cinzel.className}`}>
                            Nome
                        </label>
                        <input
                            id="customerName"
                            type="text"
                            {...register("customerName")}
                            placeholder="Digite seu nome"
                            className="bg-background/50 p-2 rounded w-full"
                        />
                    </div>

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
                    >
                        Cadastrar
                    </button>
                </form>

                <p className="text-center">
                    Já possui uma conta?{" "}
                    <a href="/login" className="text-span font-bold hover:underline">
                        Faça login
                    </a>
                </p>
            </section>
        </main>
    );
}