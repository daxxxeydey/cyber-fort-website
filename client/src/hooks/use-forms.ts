import { useMutation } from "@tanstack/react-query";
import { InsertContactMessage, InsertRegistration } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

// Simulating API endpoints since we don't have the actual implementation here, 
// but we will wire it as if we do, allowing it to fail gracefully if missing.
export function useSubmitContact() {
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: async (data: InsertContactMessage) => {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to send message");
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "SYSTEM MESSAGE",
        description: "Transmission successful. We will contact you shortly.",
        className: "bg-black border-green-500 text-green-500 font-mono",
      });
    },
    onError: () => {
      toast({
        title: "ERROR 0x000F",
        description: "Transmission intercepted. Please try again.",
        variant: "destructive",
        className: "font-mono",
      });
    }
  });
}

export function useSubmitRegistration() {
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: async (data: InsertRegistration) => {
      const res = await fetch("/api/registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to register");
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "ACCESS GRANTED",
        description: "Registration complete. Welcome to the Fort.",
        className: "bg-black border-primary text-primary font-mono",
      });
    },
    onError: () => {
      toast({
        title: "ACCESS DENIED",
        description: "Registration failed. Verify your credentials.",
        variant: "destructive",
        className: "font-mono",
      });
    }
  });
}
