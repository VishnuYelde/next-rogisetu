"use client"

import { getUserSession } from "@/actions/auth";
import { Hospital } from "lucide-react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardPage() {

    const router = useRouter();
    const [userRole, setuserRole] = useState<any>("");
    const [user, setUser] = useState<any>("");

    useEffect(() => {
      const fetchUser = async () => {
        const result = await getUserSession();

        if (result?.status === "success") {
            setUser(result.user);
            setuserRole(result.role);
            if (result.role === "patient") {
                router.push("/dashboard");
            }
            else if (result.role === "department_admin") {
                router.push("/admin/dashboard");
            }
            else if (result.role === "super_admin") {
                router.push("/super-admin/dashboard");
            }
        }

        if (!result || !result?.user) {
            redirect('/login');
        }
        
      }

      fetchUser();
    }, [])
    

    return (
        <main className="p-6">
            {/* The Dashboard contents will appear here. */}
            <h1 className="text-2xl md:text-3xl font-semibold">Welcome, <span className="font-bold">{user?.user_metadata?.name || "User"}</span>👋</h1>
            <h2 className="text-muted-foreground mt-1 text-lg">Book your appointment and track your opds.</h2>
            <div className="grid sm:grid-cols-2 gap-4 my-6">
                <Link href="/dashboard/book-opd" className="bg-muted p-4 rounded-xl border hover:border-primary">
                    <Hospital className="text-primary w-8 h-8" />
                    <h3 className="text-xl font-semibold mt-2">Book OPD</h3>
                    <p>Book an OPD appointment online by filling the application form</p>
                </Link>
                <Link href="/dashboard/track-opd" className="bg-muted p-4 rounded-xl border hover:border-primary">
                    <Hospital className="text-primary w-8 h-8" />
                    <h3 className="text-xl font-semibold mt-2">Track OPD</h3>
                    <p>Track your OPD appointment online by entering the token no.</p>
                </Link>
            </div>
        </main>
    )
}