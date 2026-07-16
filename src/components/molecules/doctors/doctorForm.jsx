"use client";

import Badge from "@/components/atoms/badge";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command";
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
    FieldContent,
    FieldDescription,
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import useAddDoctor from "@/hooks/doctors/useAddDoctor";
import useUpdateDoctor from "@/hooks/doctors/useUpdateDoctor";
import useDOCStore from "@/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown, Edit, Plus } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

const DoctorForm = ({ initialValues = false }) => {
    const isEdit = Boolean(initialValues);
    const { user: { uid } = null } = useDOCStore();

    const [open, setOpen] = useState(false);
    const [specialityInput, setSpecialityInput] = useState("");

    const { mutate: addDoctor, isPending: isAddingPending } = useAddDoctor(uid);
    const { mutate: updateDoctor, isPending: isUpdatingPending } =
        useUpdateDoctor({ uid, doctorId: initialValues?.doctorId });

    const isSubmitting = isAddingPending || isUpdatingPending;

    const form = useForm({
        resolver: zodResolver(DOCTOR_FORM_SCHEMA),
        defaultValues: initialValues || DEFAULT_DOCTOR_FORM_VALUES,
    });

    const onSubmit = (values) => {
        const fn = isEdit ? updateDoctor : addDoctor;
        fn(values, {
            onSuccess: () => {
                form.reset();
                setOpen(false);
            },
        });
    };

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger
                render={
                    <Button
                        type="button"
                        size="lg"
                        className="rounded-md! gap-2 cursor-pointer bg-linear-to-b from-green-600 to-green-800 text-white"
                    />
                }
            >
                {isEdit ? (
                    <Edit className="size-4!" />
                ) : (
                    <Plus className="size-4!" />
                )}
                {isEdit ? "Edit Doctor" : "Add Doctor"}
            </DrawerTrigger>
            <DrawerContent
                className={
                    "md:max-w-md mx-auto rounded-b-none overflow-hidden p-4 -bottom-2!"
                }
            >
                <DrawerHeader className="gap-0.5!">
                    <DrawerTitle>
                        {isEdit ? "Edit Doctor" : "Add Doctor"}
                    </DrawerTitle>
                    <DrawerDescription>
                        {isEdit
                            ? "Edit doctor details and save changes."
                            : "Add a new doctor to your directory."}
                    </DrawerDescription>
                </DrawerHeader>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="pt-4 min-h-0 overflow-x-hidden overflow-y-auto hide-scrollbar! space-y-4"
                >
                    <FieldGroup className="gap-4">
                        <Controller
                            name="name"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field
                                    data-invalid={fieldState.invalid}
                                    className="gap-1"
                                >
                                    <FieldLabel
                                        htmlFor="name"
                                        className="uppercase text-xs! text-neutral-700"
                                    >
                                        Doctor Name
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="name"
                                        value={field.value || ""}
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Enter doctor's name"
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
                        <Controller
                            name="speciality"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field className="gap-2">
                                    <FieldLabel>Specialities</FieldLabel>
                                    <Input
                                        value={specialityInput}
                                        placeholder="Type speciality and press comma"
                                        className="rounded-md text-sm"
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            if (value.endsWith(",")) {
                                                const speciality = value
                                                    .slice(0, -1)
                                                    .trim();
                                                if (
                                                    speciality &&
                                                    !field.value.includes(
                                                        speciality,
                                                    )
                                                ) {
                                                    field.onChange([
                                                        ...field.value,
                                                        speciality,
                                                    ]);
                                                }
                                                setSpecialityInput("");
                                            } else {
                                                setSpecialityInput(value);
                                            }
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                e.preventDefault();
                                                const speciality =
                                                    specialityInput.trim();
                                                if (
                                                    speciality &&
                                                    !field.value.includes(
                                                        speciality,
                                                    )
                                                ) {
                                                    field.onChange([
                                                        ...field.value,
                                                        speciality,
                                                    ]);
                                                }
                                                setSpecialityInput("");
                                            }
                                        }}
                                    />
                                    <div className="flex flex-wrap gap-2">
                                        {field.value.map((item) => (
                                            <Badge
                                                key={item}
                                                variant="green"
                                                className="w-fit text-[8px] uppercase"
                                            >
                                                {item}
                                            </Badge>
                                        ))}
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
                            name="hospital"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field
                                    data-invalid={fieldState.invalid}
                                    className="gap-1"
                                >
                                    <FieldLabel
                                        htmlFor="hospital"
                                        className="uppercase text-xs! text-neutral-700"
                                    >
                                        Hospital/Clinic Name (Optional)
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="hospital"
                                        value={field.value || ""}
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Enter doctor's hospital/clinic name"
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
                        <Controller
                            name="mobile"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field
                                    data-invalid={fieldState.invalid}
                                    className="gap-1"
                                >
                                    <FieldLabel
                                        htmlFor="mobile"
                                        className="uppercase text-xs! text-neutral-700"
                                    >
                                        Mobile Number (Optional)
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="mobile"
                                        type="tel"
                                        inputMode="numeric"
                                        maxLength={10}
                                        value={field.value || ""}
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Enter doctor's mobile number"
                                        autoComplete="off"
                                        className="rounded-md text-sm"
                                        onChange={(e) => {
                                            const value =
                                                e.target.value.replace(
                                                    /\D/g,
                                                    "",
                                                );
                                            field.onChange(value);
                                        }}
                                    />
                                    {fieldState.invalid && (
                                        <FieldError
                                            errors={[fieldState.error]}
                                        />
                                    )}
                                </Field>
                            )}
                        />
                        <div className="grid gap-4 w-full grid-cols-2">
                            <Controller
                                name="monthlyTarget"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field
                                        data-invalid={fieldState.invalid}
                                        className="gap-1"
                                    >
                                        <FieldLabel
                                            htmlFor="monthlyTarget"
                                            className="text-xs! uppercase text-neutral-700"
                                        >
                                            Monthly Target
                                        </FieldLabel>
                                        <Select
                                            value={
                                                field.value === undefined ||
                                                field.value === null
                                                    ? ""
                                                    : String(field.value)
                                            }
                                            onValueChange={(value) =>
                                                field.onChange(Number(value))
                                            }
                                        >
                                            <SelectTrigger
                                                id="monthlyTarget"
                                                aria-invalid={
                                                    fieldState.invalid
                                                }
                                                className="w-full rounded-md"
                                            >
                                                <SelectValue placeholder="Select Monthly Target" />
                                            </SelectTrigger>
                                            <SelectContent className="rounded-md max-h-32">
                                                {TARGET_OPTIONS.map(
                                                    (option) => (
                                                        <SelectItem
                                                            key={option.value}
                                                            value={option.value.toString()}
                                                            className="rounded-md"
                                                        >
                                                            {option.label}
                                                        </SelectItem>
                                                    ),
                                                )}
                                            </SelectContent>
                                        </Select>
                                        {fieldState.invalid && (
                                            <FieldError
                                                errors={[fieldState.error]}
                                            />
                                        )}
                                    </Field>
                                )}
                            />
                            <Controller
                                name="visitingDays"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field
                                        data-invalid={fieldState.invalid}
                                        className="gap-1"
                                    >
                                        <FieldLabel className="text-xs uppercase text-neutral-700">
                                            Visiting Days
                                        </FieldLabel>
                                        <Popover>
                                            <PopoverTrigger
                                                render={
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        className="w-full justify-between rounded-md!"
                                                    />
                                                }
                                            >
                                                <div className="flex items-center gap-1 overflow-hidden">
                                                    {field.value?.length ? (
                                                        <>
                                                            {field.value
                                                                .slice(0, 2)
                                                                .map((day) => (
                                                                    <Badge
                                                                        key={
                                                                            day
                                                                        }
                                                                        variant="green"
                                                                        className="w-fit text-[8px] uppercase"
                                                                    >
                                                                        {day}
                                                                    </Badge>
                                                                ))}

                                                            {field.value
                                                                .length > 2 && (
                                                                <Badge
                                                                    variant="green"
                                                                    className="w-fit text-[8px] uppercase"
                                                                >
                                                                    +
                                                                    {field.value
                                                                        .length -
                                                                        2}{" "}
                                                                    more
                                                                </Badge>
                                                            )}
                                                        </>
                                                    ) : (
                                                        <span className="text-muted-foreground">
                                                            Select visiting days
                                                        </span>
                                                    )}
                                                </div>
                                                <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                                            </PopoverTrigger>
                                            <PopoverContent className="w-full p-0 rounded-md max-h-32">
                                                <Command className="rounded-md! w-full">
                                                    <CommandInput
                                                        placeholder="Search day..."
                                                        className="rounded-md!"
                                                    />
                                                    <CommandEmpty>
                                                        No day found.
                                                    </CommandEmpty>
                                                    <CommandGroup className="overflow-y-auto max-h-32">
                                                        {DAYS.map((day) => {
                                                            const selected =
                                                                field.value?.includes(
                                                                    day,
                                                                );
                                                            return (
                                                                <CommandItem
                                                                    key={day}
                                                                    value={day}
                                                                    className="rounded-md!"
                                                                    onSelect={() => {
                                                                        if (
                                                                            selected
                                                                        ) {
                                                                            field.onChange(
                                                                                field.value.filter(
                                                                                    (
                                                                                        d,
                                                                                    ) =>
                                                                                        d !==
                                                                                        day,
                                                                                ),
                                                                            );
                                                                        } else {
                                                                            field.onChange(
                                                                                [
                                                                                    ...(field.value ||
                                                                                        []),
                                                                                    day,
                                                                                ],
                                                                            );
                                                                        }
                                                                    }}
                                                                >
                                                                    <Check
                                                                        className={`mr-2 h-4 w-4 ${
                                                                            selected
                                                                                ? "opacity-100"
                                                                                : "opacity-0"
                                                                        }`}
                                                                    />

                                                                    {day}
                                                                </CommandItem>
                                                            );
                                                        })}
                                                    </CommandGroup>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>

                                        {fieldState.invalid && (
                                            <FieldError
                                                errors={[fieldState.error]}
                                            />
                                        )}
                                    </Field>
                                )}
                            />
                        </div>
                        <div className="grid gap-4 w-full grid-cols-2">
                            <Controller
                                name="startTime"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field
                                        data-invalid={fieldState.invalid}
                                        className="gap-1"
                                    >
                                        <FieldLabel
                                            htmlFor="startTime"
                                            className="uppercase text-xs! text-neutral-700"
                                        >
                                            Start Time
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            id="startTime"
                                            type="time"
                                            value={field.value || ""}
                                            aria-invalid={fieldState.invalid}
                                            placeholder="start time"
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
                            <Controller
                                name="endTime"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field
                                        data-invalid={fieldState.invalid}
                                        className="gap-1"
                                    >
                                        <FieldLabel
                                            htmlFor="endTime"
                                            className="uppercase text-xs! text-neutral-700"
                                        >
                                            Start Time
                                        </FieldLabel>
                                        <Input
                                            {...field}
                                            id="endTime"
                                            type="time"
                                            value={field.value || ""}
                                            aria-invalid={fieldState.invalid}
                                            placeholder="End time"
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
                        </div>
                        <Controller
                            name="appointmentRequired"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field
                                    orientation="horizontal"
                                    data-invalid={fieldState.invalid}
                                    className="gap-1 flex items-center h-full"
                                >
                                    <FieldContent>
                                        <FieldLabel
                                            htmlFor="appointmentRequired"
                                            className="uppercase text-xs! text-neutral-700"
                                        >
                                            Appointment Required
                                        </FieldLabel>
                                        <FieldDescription className="text-[10px]">
                                            Turn on if appointment is required
                                            before visiting.
                                        </FieldDescription>
                                        {fieldState.invalid && (
                                            <FieldError
                                                errors={[fieldState.error]}
                                            />
                                        )}
                                    </FieldContent>
                                    <Switch
                                        id="appointmentRequired"
                                        checked={Boolean(field.value)}
                                        onCheckedChange={(checked) =>
                                            field.onChange(Boolean(checked))
                                        }
                                        className="my-auto"
                                    />
                                </Field>
                            )}
                        />
                        <Controller
                            name="messages"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field
                                    data-invalid={fieldState.invalid}
                                    className="gap-1"
                                >
                                    <FieldLabel
                                        htmlFor="messages"
                                        className="uppercase text-xs! text-neutral-700"
                                    >
                                        Notes / Special Instructions
                                    </FieldLabel>
                                    <Textarea
                                        {...field}
                                        id="messages"
                                        value={field.value || ""}
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Enter note ..."
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
                        <div className="grid grid-cols-2 gap-4 w-full">
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
                                {isEdit ? "Update Doctor" : "Add Doctor"}
                            </Button>
                        </div>
                    </FieldGroup>
                </form>
            </DrawerContent>
        </Drawer>
    );
};

export default DoctorForm;

const DOCTOR_FORM_SCHEMA = z.object({
    name: z.string().min(1, "Name is required"),
    speciality: z.array(z.string()).min(1, "Speciality is required"),
    hospital: z.string().optional(),
    mobile: z.string().optional(),
    monthlyTarget: z.coerce.number().min(1, "Monthly target is required"),
    visitingDays: z.array(z.string()).min(1, "Select atleast one visiting day"),
    startTime: z.string().min(1, "Start time is required"),
    endTime: z.string().min(1, "End time is required"),
    appointmentRequired: z.boolean(),
    messages: z.string().optional(),
});

const TARGET_OPTIONS = [
    { label: "1 Visit / Month", value: 1 },
    { label: "2 Visits / Month", value: 2 },
    { label: "3 Visits / Month", value: 3 },
    { label: "4 Visits / Month", value: 4 },
    { label: "5 Visits / Month", value: 5 },
    { label: "6 Visits / Month", value: 6 },
];

const DAYS = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
];

const DEFAULT_DOCTOR_FORM_VALUES = {
    name: "",
    speciality: [],
    hospital: "",
    mobile: "",
    monthlyTarget: "",
    visitingDays: [],
    startTime: "",
    endTime: "",
    appointmentRequired: false,
    messages: "",
};
