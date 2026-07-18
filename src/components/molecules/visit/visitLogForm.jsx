"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import useAddVisits from "@/hooks/visits/useAddVisits";
import useUpdateVisits from "@/hooks/visits/useUpdateVisits";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Edit, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

const VisitLogForm = ({
    initialValues = false,
    data,
    icon = false,
    size = "lg",
    variant = "default",
}) => {
    const isEdit = Boolean(initialValues);

    const [open, setOpen] = useState(false);

    const form = useForm({
        resolver: zodResolver(VISIT_SCHEMA),
        defaultValues: initialValues
            ? {
                  ...initialValues,
                  visitDate: initialValues.visitDate
                      ? new Date(initialValues.visitDate)
                      : new Date(),
              }
            : VISIT_DEFAULT_VALUES,
    });

    const { mutate: addVisit, isPending: isPendingAddVisit } = useAddVisits({
        uid: data.uid,
        doctorId: data.doctorId,
    });
    const { mutate: updateVisit, isPending: isPendingUpdateVisit } =
        useUpdateVisits({ uid: data.uid, visitId: data.visitId });
    const isSubmitting = isPendingAddVisit || isPendingUpdateVisit;

    const onSubmit = (values) => {
        const fn = isEdit ? updateVisit : addVisit;
        fn(values, {
            onSuccess: () => {
                form.reset();
                setOpen(false);
            },
        });
    };

    useEffect(() => {
        if (!form.getValues("visitDate")) {
            form.setValue("visitDate", new Date());
        }
    }, [form]);

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger
                render={
                    <Button
                        type="button"
                        variant={variant}
                        size={size}
                        className={
                            variant === "default"
                                ? "rounded-md! gap-2 cursor-pointer bg-linear-to-b from-green-600 to-green-800 text-white"
                                : "rounded-md!"
                        }
                    />
                }
            >
                {isEdit ? (
                    <Edit className="size-4!" />
                ) : (
                    <Plus className="size-4!" />
                )}
                {!icon && (isEdit ? "Edit Visit" : "Log Visit")}
            </DrawerTrigger>
            <DrawerContent
                className={
                    "md:max-w-md mx-auto rounded-b-none overflow-hidden p-4 -bottom-2!"
                }
            >
                <DrawerHeader className="gap-0.5!">
                    <DrawerTitle>
                        {isEdit ? "Edit Doctor Visit" : "Log Doctor Visit"}
                    </DrawerTitle>
                    <DrawerDescription>
                        {isEdit
                            ? "Edit visit details and save changes."
                            : "Log a new visit for the doctor."}
                    </DrawerDescription>
                </DrawerHeader>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="min-h-0 pt-4 space-y-4"
                >
                    <FieldGroup className="gap-4">
                        <Controller
                            name="visitDate"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field
                                    data-invalid={fieldState.invalid}
                                    className="gap-2"
                                >
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <FieldLabel className="uppercase text-xs text-neutral-700">
                                                Date
                                            </FieldLabel>
                                            <Popover>
                                                <PopoverTrigger
                                                    render={
                                                        <Button
                                                            variant="outline"
                                                            className="w-full justify-start rounded-md! font-normal"
                                                        />
                                                    }
                                                >
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {field.value
                                                        ? format(
                                                              field.value,
                                                              "dd MMM yyyy",
                                                          )
                                                        : "Select date"}
                                                </PopoverTrigger>
                                                <PopoverContent
                                                    className="w-auto p-0"
                                                    align="start"
                                                >
                                                    <Calendar
                                                        mode="single"
                                                        selected={field.value}
                                                        onSelect={(date) => {
                                                            if (!date) return;

                                                            const current =
                                                                field.value ??
                                                                new Date();

                                                            date.setHours(
                                                                current.getHours(),
                                                            );
                                                            date.setMinutes(
                                                                current.getMinutes(),
                                                            );

                                                            field.onChange(
                                                                date,
                                                            );
                                                        }}
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                        </div>
                                        <div className="space-y-2">
                                            <FieldLabel className="uppercase text-xs text-neutral-700">
                                                Time
                                            </FieldLabel>
                                            <Input
                                                type="time"
                                                value={
                                                    field.value
                                                        ? format(
                                                              field.value,
                                                              "HH:mm",
                                                          )
                                                        : ""
                                                }
                                                className={"rounded-md!"}
                                                onChange={(e) => {
                                                    const [hours, minutes] =
                                                        e.target.value.split(
                                                            ":",
                                                        );
                                                    const updated = new Date(
                                                        field.value ??
                                                            new Date(),
                                                    );
                                                    updated.setHours(
                                                        Number(hours),
                                                    );
                                                    updated.setMinutes(
                                                        Number(minutes),
                                                    );
                                                    field.onChange(updated);
                                                }}
                                            />
                                        </div>
                                    </div>
                                    {fieldState.invalid && (
                                        <FieldError
                                            errors={[fieldState.error]}
                                        />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            name="comments"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field
                                    data-invalid={fieldState.invalid}
                                    className="gap-1"
                                >
                                    <FieldLabel
                                        htmlFor="comments"
                                        className="uppercase text-xs! text-neutral-700"
                                    >
                                        Comments for Visit
                                    </FieldLabel>
                                    <Textarea
                                        {...field}
                                        id="comments"
                                        value={field.value || ""}
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Enter comments"
                                        autoComplete="off"
                                        className="rounded-md text-sm"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError
                                            errors={[fieldState.error]}
                                        />
                                    )}
                                </Field>
                            )}
                        />
                        <div className="grid grid-cols-2 gap-2 w-full">
                            <Button
                                type="button"
                                size="lg"
                                variant="outline"
                                className="rounded-md! gap-2 cursor-pointer w-full"
                                onClick={() => setOpen(false)}
                            >
                                Close
                            </Button>
                            <Button
                                type="submit"
                                size="lg"
                                disabled={isSubmitting}
                                className="rounded-md! gap-2 cursor-pointer bg-linear-to-b from-green-600 to-green-800 text-white w-full"
                            >
                                {isEdit ? "Update Visit Log" : "Save Visit Log"}
                            </Button>
                        </div>
                    </FieldGroup>
                </form>
            </DrawerContent>
        </Drawer>
    );
};

export default VisitLogForm;

const VISIT_SCHEMA = z.object({
    visitDate: z.coerce.date({
        required_error: "Visit date is required",
    }),
    comments: z
        .string()
        .trim()
        .min(5, "Comments must be at least 5 characters")
        .max(500, "Comments can be at most 500 characters"),
});

const VISIT_DEFAULT_VALUES = {
    visitDate: new Date(),
    comments: "",
};
