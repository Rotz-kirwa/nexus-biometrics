import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Shield, Loader2, ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const schema = z.object({
  first_name: z.string().min(1, "Required").max(50),
  last_name: z.string().min(1, "Required").max(50),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Min 6 characters"),
  department: z.string().optional(),
  position: z.string().optional(),
  phone: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

const steps = ["Personal Info", "Employment", "Confirm"];

const RegisterPage = () => {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(0);

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const nextStep = async () => {
    const fields: (keyof FormValues)[][] = [
      ["first_name", "last_name", "email", "password"],
      ["department", "position", "phone"],
    ];
    const valid = await trigger(fields[step]);
    if (valid) setStep((s) => Math.min(s + 1, 2));
  };

  const onSubmit = async (data: FormValues) => {
    try {
      await registerUser({
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        password: data.password,
        department: data.department,
        position: data.position,
        phone: data.phone,
      });
      toast({ title: "Account created!", description: "Welcome to Nexus Biometrics." });
      navigate("/dashboard");
    } catch {
      toast({ title: "Registration failed", description: "Please try again.", variant: "destructive" });
    }
  };

  const values = watch();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-6">
      <div className="w-full max-w-md space-y-8 animate-slide-up">
        <div className="flex items-center gap-3 justify-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-primary">
            <Shield className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold tracking-wide">NEXUS</span>
        </div>

        <div className="text-center">
          <h1 className="text-2xl font-bold">Create an account</h1>
          <p className="text-sm text-muted-foreground mt-1">Step {step + 1} of 3: {steps[step]}</p>
        </div>

        {/* Step indicators */}
        <div className="flex items-center justify-center gap-2">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all ${
                i <= step ? "w-10 bg-primary" : "w-6 bg-muted"
              }`}
            />
          ))}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {step === 0 && (
            <div className="space-y-4 animate-fade-in">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>First Name</Label>
                  <Input {...register("first_name")} className={errors.first_name ? "border-destructive" : ""} />
                  {errors.first_name && <p className="text-xs text-destructive">{errors.first_name.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label>Last Name</Label>
                  <Input {...register("last_name")} className={errors.last_name ? "border-destructive" : ""} />
                  {errors.last_name && <p className="text-xs text-destructive">{errors.last_name.message}</p>}
                </div>
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" {...register("email")} className={errors.email ? "border-destructive" : ""} />
                {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
              </div>
              <div className="space-y-2">
                <Label>Password</Label>
                <Input type="password" {...register("password")} className={errors.password ? "border-destructive" : ""} />
                {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4 animate-fade-in">
              <div className="space-y-2">
                <Label>Department (optional)</Label>
                <Input {...register("department")} placeholder="e.g. Engineering" />
              </div>
              <div className="space-y-2">
                <Label>Position (optional)</Label>
                <Input {...register("position")} placeholder="e.g. Software Engineer" />
              </div>
              <div className="space-y-2">
                <Label>Phone (optional)</Label>
                <Input {...register("phone")} placeholder="+1 555-0100" />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 animate-fade-in">
              <div className="rounded-lg bg-muted p-4 space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Name</span><span className="font-medium">{values.first_name} {values.last_name}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Email</span><span className="font-medium">{values.email}</span></div>
                {values.department && <div className="flex justify-between"><span className="text-muted-foreground">Department</span><span className="font-medium">{values.department}</span></div>}
                {values.position && <div className="flex justify-between"><span className="text-muted-foreground">Position</span><span className="font-medium">{values.position}</span></div>}
              </div>
            </div>
          )}

          <div className="flex gap-3">
            {step > 0 && (
              <Button type="button" variant="outline" onClick={() => setStep((s) => s - 1)} className="flex-1">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
            )}
            {step < 2 ? (
              <Button type="button" onClick={nextStep} className="flex-1 gradient-primary text-primary-foreground">
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button type="submit" className="flex-1 gradient-primary text-primary-foreground" disabled={isSubmitting}>
                {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Check className="mr-2 h-4 w-4" />}
                Create Account
              </Button>
            )}
          </div>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-primary hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
