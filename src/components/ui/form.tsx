"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "./button";

export interface Field {
    name: string;
    label: string;
    type?: string;
    placeholder?: string;
    options?: string[];
    rule: z.ZodTypeAny;
}

export function SmartForm({ fields, submitLabel, onSubmit, defaults = {} }: {
    fields: Field[];
    submitLabel: string;
    defaults?: Record<string, string>;
    onSubmit: (values: Record<string, string>) => Promise<string | void>;
}) {
    const schema = z.object(Object.fromEntries(fields.map(field => [field.name, field.rule])));
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm < Record < string, string>> ({
        resolver: zodResolver(schema),
        defaultValues: defaults,
    });
    const [message, setMessage] = useState("");
    const [failed, setFailed] = useState(false);

    return (
        <form className="space-y-4" onSubmit={handleSubmit(async values => {
            setMessage("");
            setFailed(false);
            try {
                setMessage((await onSubmit(values)) || "");
            } catch (err) {
                setFailed(true);
                setMessage(err instanceof Error ? err.message : "Please try again.");
            }
        })}>
            {fields.map(field => {
                const id = "field-" + field.name;
                return (
                    <div key={field.name}>
                        <label className="mb-2 block text-sm font-medium" htmlFor={id}>{field.label}</label>
                        {field.options ? (
                            <select id={id} className="input" {...register(field.name)} aria-invalid={!!errors[field.name]} aria-describedby={errors[field.name] ? id + "-error" : undefined}>
                                {field.options.map(option => <option key={option}>{option}</option>)}
                            </select>
                        ) : field.type === "textarea" ? (
                            <textarea id={id} className="input min-h-28" {...register(field.name)} aria-invalid={!!errors[field.name]} aria-describedby={errors[field.name] ? id + "-error" : undefined} />
                        ) : (
                            <input id={id} className="input" type={field.type || "text"} placeholder={field.placeholder} {...register(field.name)} aria-invalid={!!errors[field.name]} aria-describedby={errors[field.name] ? id + "-error" : undefined} />
                        )}
                        {errors[field.name] && <p id={id + "-error"} className="mt-1 text-sm text-red-500">{String(errors[field.name]?.message)}</p>}
                    </div>
                );
            })}
            <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? "Please wait…" : submitLabel}
            </Button>
            {message && <p role={failed ? "alert" : "status"} className={failed ? "text-sm text-red-500" : "text-sm text-emerald-600 dark:text-emerald-400"}>{message}</p>}
        </form>
    );
}
