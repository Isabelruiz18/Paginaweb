'use client';

import React, { useState } from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Info, User, Calendar, Mail, Phone, MapPin, Briefcase, Droplet, LanguagesIcon, Star, LinkIcon, Image as ImageIcon, Video, FileCheck, LogOut, PlusCircle, Trash2 } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { es } from 'date-fns/locale'; // Import Spanish locale for date-fns

// --- Zod Schema Definition ---
const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
); // Basic phone number regex

const applicationSchema = z.object({
  auditionCategory1: z.string().min(1, "Selecciona una categoría principal"),
  auditionCategory2: z.string().optional(),
  fullName: z.string().min(2, "Nombre completo es requerido"),
  gender: z.string().min(1, "Selecciona tu género"),
  dob: z.date({ required_error: "Fecha de nacimiento es requerida" }),
  nationality: z.string().min(1, "Selecciona tu nacionalidad"),
  email: z.string().email().optional(), // Pre-filled, not editable
  phoneNumber: z.string().regex(phoneRegex, 'Número de teléfono inválido').min(8, "Número de teléfono inválido"),
  postalCode: z.string().min(3, "Código postal inválido"),
  address: z.string().min(5, "Dirección es requerida"),
  addressDetail: z.string().optional(),
  occupation: z.string().optional(),
  bloodType: z.string().optional(),
  languages: z.array(z.object({ name: z.string().min(1, "Nombre del idioma"), level: z.string().min(1, "Nivel requerido") })).optional(),
  hobbies: z.string().optional(),
  experience: z.string().optional(),
  socialMedia: z.array(z.object({ platform: z.string().min(1, "Plataforma requerida"), url: z.string().url("URL inválida") })).optional(),
  profilePhoto: z.any().refine(file => file?.length == 1, "Foto de perfil es requerida.").optional(), // Simplified for example
  additionalPhotos: z.any().optional(), // Placeholder validation
  auditionVideo: z.any().refine(file => file?.length == 1, "Video de audición es requerido.").optional(), // Simplified for example
  presentationVideo: z.any().optional(), // Placeholder validation
  consent: z.boolean().refine(val => val === true, "Debes aceptar los términos"),
});

type ApplicationFormData = z.infer<typeof applicationSchema>;

interface ApplicationFormProps {
  auditionSlug: string;
  verifiedEmail: string;
}

// --- Mock Data (Replace with actual data fetching/constants) ---
const categories = ["Vocal", "Rap", "Baile", "Actuación", "Modelo", "Composición"];
const genders = ["Masculino", "Femenino", "No binario", "Prefiero no decir"];
const nationalities = ["Española", "Mexicana", "Argentina", "Colombiana", "Otra"]; // Example list
const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", "No sé"];
const languageLevels = ["Básico", "Intermedio", "Avanzado", "Nativo"];
const socialPlatforms = ["Instagram", "TikTok", "YouTube", "Twitter/X", "Facebook", "Otro"];


export function ApplicationForm({ auditionSlug, verifiedEmail }: ApplicationFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const form = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      email: verifiedEmail,
      languages: [{ name: '', level: '' }],
      socialMedia: [{ platform: '', url: '' }],
      consent: false,
    },
  });

  const { fields: languageFields, append: appendLanguage, remove: removeLanguage } = useFieldArray({
    control: form.control,
    name: "languages",
  });

   const { fields: socialFields, append: appendSocial, remove: removeSocial } = useFieldArray({
     control: form.control,
     name: "socialMedia",
   });

  const onSubmit = async (data: ApplicationFormData) => {
    setIsLoading(true);
    console.log("Form Data Submitted:", data);

    // --- Placeholder for Backend Submission ---
    // Replace this with your actual API call
    try {
      // Example: Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      // const response = await fetch('/api/submit-application', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ ...data, auditionSlug }), // Include audition slug
      // });
      // if (!response.ok) throw new Error('Submission failed');

      toast({
        title: "Solicitud Enviada",
        description: "Tu solicitud ha sido enviada con éxito. Recibirás una confirmación por correo.",
        className: "bg-green-100 border-green-500 text-green-700",
      });
      // Redirect to a success page or dashboard
       router.push(`/apply/success?email=${encodeURIComponent(verifiedEmail)}`);
    } catch (error) {
      console.error("Submission Error:", error);
      toast({
        title: "Error al Enviar",
        description: "No se pudo enviar tu solicitud. Por favor, inténtalo de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
    // --- End Placeholder ---
  };

   const handleNext = async () => {
       // Trigger validation for the current step's fields
       let isValid = false;
       if (currentStep === 0) { // Step 1: Basic Info
           isValid = await form.trigger(["auditionCategory1", "fullName", "gender", "dob", "nationality", "phoneNumber", "postalCode", "address"]);
       } else if (currentStep === 1) { // Step 2: Optional Info
           isValid = await form.trigger(["occupation", "bloodType", "languages", "hobbies"]); // Optional fields might not need trigger
           isValid = true; // Or just assume valid as they are optional
       } else if (currentStep === 2) { // Step 3: Experience & Social
           isValid = await form.trigger(["experience", "socialMedia"]);
           isValid = true; // Or just assume valid
       } else if (currentStep === 3) { // Step 4: Attachments
           // File validation is tricky with react-hook-form's default trigger
           // We might rely on the final submit validation or add custom logic here
            // Temporary: check required files manually - replace with better logic
            const profilePhoto = form.watch('profilePhoto');
            const auditionVideo = form.watch('auditionVideo');
            if (!profilePhoto || profilePhoto.length === 0) {
                form.setError('profilePhoto', { type: 'manual', message: 'Foto de perfil es requerida.' });
                isValid = false;
            } else {
                 form.clearErrors('profilePhoto'); // Clear error if file exists
                 isValid = true; // Assume valid for now
            }
             if (!auditionVideo || auditionVideo.length === 0) {
               form.setError('auditionVideo', { type: 'manual', message: 'Video de audición es requerido.' });
               isValid = false;
             } else {
                 form.clearErrors('auditionVideo');
                 isValid = isValid && true; // Maintain validity chain
             }
       }

       if (isValid) {
         setCurrentStep((prev) => prev + 1);
       } else {
          toast({ title: "Campos Incompletos", description: "Por favor, completa todos los campos requeridos en esta sección.", variant: "destructive" });
       }
   };

  const handlePrev = () => {
    setCurrentStep((prev) => prev - 1);
  };

   // Handle file input changes
   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, fieldName: keyof ApplicationFormData) => {
     const files = event.target.files;
     if (files) {
       form.setValue(fieldName, files); // Store FileList
        form.clearErrors(fieldName); // Clear errors when a file is selected
     }
   };


  const renderStep = () => {
    switch (currentStep) {
      case 0: return <Step1 form={form} />;
      case 1: return <Step2 form={form} languageControl={{ fields: languageFields, append: appendLanguage, remove: removeLanguage }} />;
      case 2: return <Step3 form={form} socialControl={{ fields: socialFields, append: appendSocial, remove: removeSocial }} />;
       case 3: return <Step4 form={form} handleFileChange={handleFileChange} />;
      case 4: return <Step5 form={form} />;
      default: return null;
    }
  };

   // --- Logout Functionality (Placeholder) ---
   const handleLogout = () => {
     console.log("Logout initiated");
     // Implement actual logout logic (e.g., clear session, redirect)
     toast({ title: "Cerrando Sesión", description: "Has cerrado sesión." });
     router.push('/'); // Redirect to homepage after logout
   };

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-xl">
      <CardHeader className="flex flex-row justify-between items-center">
        <div>
          <CardTitle className="text-xl font-semibold text-primary">Formulario de Solicitud</CardTitle>
          <CardDescription>Paso {currentStep + 1} de 5</CardDescription>
        </div>
         <Button variant="ghost" size="sm" onClick={handleLogout} className="text-muted-foreground hover:text-destructive">
           <LogOut className="mr-2 h-4 w-4" /> Cerrar Sesión
         </Button>
      </CardHeader>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent className="space-y-6 min-h-[400px]"> {/* Min height for content area */}
           {/* Progress Bar Placeholder */}
          <div className="w-full bg-secondary rounded-full h-2.5 mb-6">
             <div className="bg-accent h-2.5 rounded-full" style={{ width: `${((currentStep + 1) / 5) * 100}%`, transition: 'width 0.3s ease-in-out' }}></div>
           </div>
          {renderStep()}
        </CardContent>
        <CardFooter className="flex justify-between pt-6 border-t">
          <Button type="button" variant="outline" onClick={handlePrev} disabled={currentStep === 0 || isLoading}>
            Anterior
          </Button>
          {currentStep < 4 ? (
             <Button type="button" onClick={handleNext} disabled={isLoading} className="bg-accent hover:bg-accent/90 text-accent-foreground">
              Siguiente
            </Button>
          ) : (
            <Button type="submit" disabled={isLoading || !form.watch('consent')} className="bg-green-600 hover:bg-green-700 text-white">
              {isLoading ? 'Enviando...' : 'ENVIAR SOLICITUD'}
            </Button>
          )}
        </CardFooter>
         {/* Global Form Errors (Optional) */}
         {Object.keys(form.formState.errors).length > 0 && currentStep === 4 && ( // Show only on last step before submit?
           <div className="px-6 pb-4 text-sm text-destructive">
             <p>Por favor, revisa los errores en el formulario antes de enviar.</p>
             {/* You could list specific errors here if desired */}
           </div>
         )}
      </form>
    </Card>
  );
}

// --- Step Components ---

function Step1({ form }: { form: any }) { // Use 'any' for simplicity, or define specific step props
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-primary flex items-center gap-2"><Info className="text-accent" /> Información Obligatoria</h3>
      <Separator />
       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Audition Category 1 */}
         <FormField control={form.control} name="auditionCategory1" label="Categoría Principal *" icon={Star}>
           <Select onValueChange={(value) => form.setValue("auditionCategory1", value)} defaultValue={form.getValues("auditionCategory1")}>
            <SelectTrigger><SelectValue placeholder="Selecciona una categoría" /></SelectTrigger>
            <SelectContent>{categories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}</SelectContent>
          </Select>
         </FormField>
         {/* Audition Category 2 */}
        <FormField control={form.control} name="auditionCategory2" label="Categoría Secundaria (Opcional)" icon={Star}>
           <Select onValueChange={(value) => form.setValue("auditionCategory2", value)} defaultValue={form.getValues("auditionCategory2")}>
            <SelectTrigger><SelectValue placeholder="Selecciona una categoría" /></SelectTrigger>
            <SelectContent>{categories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}</SelectContent>
          </Select>
         </FormField>
        {/* Full Name */}
         <FormField control={form.control} name="fullName" label="Nombre Completo *" icon={User} placeholder="Tu nombre completo" />
        {/* Gender */}
         <FormField control={form.control} name="gender" label="Género *" icon={User}>
           <Select onValueChange={(value) => form.setValue("gender", value)} defaultValue={form.getValues("gender")}>
            <SelectTrigger><SelectValue placeholder="Selecciona tu género" /></SelectTrigger>
            <SelectContent>{genders.map(gen => <SelectItem key={gen} value={gen}>{gen}</SelectItem>)}</SelectContent>
          </Select>
         </FormField>
         {/* Date of Birth */}
         <FormField control={form.control} name="dob" label="Fecha de Nacimiento *" icon={Calendar}>
           <Controller
             control={form.control}
             name="dob"
             render={({ field }) => (
               <Popover>
                 <PopoverTrigger asChild>
                   <Button
                     variant={"outline"}
                     className={cn(
                       "w-full justify-start text-left font-normal",
                       !field.value && "text-muted-foreground"
                     )}
                   >
                     <CalendarIcon className="mr-2 h-4 w-4" />
                     {field.value ? format(field.value, "PPP", { locale: es }) : <span>Selecciona una fecha</span>}
                   </Button>
                 </PopoverTrigger>
                 <PopoverContent className="w-auto p-0">
                   <Calendar
                     mode="single"
                     selected={field.value}
                     onSelect={field.onChange}
                      captionLayout="dropdown-buttons" // Enable year/month dropdowns
                      fromYear={1950} // Example range
                      toYear={new Date().getFullYear() - 10} // Example minimum age
                     initialFocus
                   />
                 </PopoverContent>
               </Popover>
             )}
           />
         </FormField>
         {/* Nationality */}
         <FormField control={form.control} name="nationality" label="Nacionalidad *" icon={MapPin}>
           <Select onValueChange={(value) => form.setValue("nationality", value)} defaultValue={form.getValues("nationality")}>
            <SelectTrigger><SelectValue placeholder="Selecciona tu nacionalidad" /></SelectTrigger>
            <SelectContent>{nationalities.map(nat => <SelectItem key={nat} value={nat}>{nat}</SelectItem>)}</SelectContent>
          </Select>
         </FormField>
        {/* Email (Read Only) */}
         <FormField control={form.control} name="email" label="Correo Electrónico" icon={Mail} disabled={true} />
        {/* Phone Number */}
        <FormField control={form.control} name="phoneNumber" label="Número de Teléfono *" icon={Phone} placeholder="+Código País Número" />
         {/* Postal Code */}
        <FormField control={form.control} name="postalCode" label="Código Postal *" icon={MapPin} placeholder="Tu código postal" />
         {/* Address */}
        <FormField control={form.control} name="address" label="Dirección *" icon={MapPin} placeholder="Tu dirección" />
         {/* Address Detail */}
        <FormField control={form.control} name="addressDetail" label="Dirección Detallada (Opcional)" icon={MapPin} placeholder="Piso, puerta, etc." />
      </div>
    </div>
  );
}

function Step2({ form, languageControl }: { form: any, languageControl: any }) {
  const { fields, append, remove } = languageControl;
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-primary flex items-center gap-2"><Briefcase className="text-accent" /> Información Opcional</h3>
      <Separator />
       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
         {/* Occupation */}
         <FormField control={form.control} name="occupation" label="Ocupación" icon={Briefcase} placeholder="Estudiante, trabajador, etc." />
        {/* Blood Type */}
        <FormField control={form.control} name="bloodType" label="Tipo de Sangre" icon={Droplet}>
           <Select onValueChange={(value) => form.setValue("bloodType", value)} defaultValue={form.getValues("bloodType")}>
            <SelectTrigger><SelectValue placeholder="Selecciona tipo de sangre" /></SelectTrigger>
            <SelectContent>{bloodTypes.map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}</SelectContent>
          </Select>
         </FormField>
       </div>

       {/* Languages */}
       <div className="space-y-3">
         <Label className="flex items-center gap-2"><LanguagesIcon className="text-accent" /> Idiomas que hablas (excluyendo lengua materna)</Label>
         {fields.map((field: any, index: number) => (
           <div key={field.id} className="flex items-end gap-2 p-3 border rounded-md bg-secondary/20">
             <FormField control={form.control} name={`languages.${index}.name`} label={`Idioma ${index + 1}`} noIcon className="flex-1">
               <Input placeholder="Ej: Inglés" {...form.register(`languages.${index}.name`)} />
             </FormField>
            <FormField control={form.control} name={`languages.${index}.level`} label="Nivel" noIcon className="flex-1">
               <Select onValueChange={(value) => form.setValue(`languages.${index}.level`, value)} defaultValue={field.level}>
                 <SelectTrigger><SelectValue placeholder="Nivel" /></SelectTrigger>
                 <SelectContent>{languageLevels.map(lvl => <SelectItem key={lvl} value={lvl}>{lvl}</SelectItem>)}</SelectContent>
               </Select>
             </FormField>
             <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)} className="text-destructive hover:bg-destructive/10" aria-label="Eliminar idioma">
               <Trash2 className="h-4 w-4" />
             </Button>
           </div>
         ))}
         <Button type="button" variant="outline" size="sm" onClick={() => append({ name: '', level: '' })}>
           <PlusCircle className="mr-2 h-4 w-4" /> Añadir Idioma
         </Button>
          {form.formState.errors.languages && <p className="text-sm text-destructive">{form.formState.errors.languages.message || "Error en la sección de idiomas"}</p>}
       </div>

        {/* Hobbies/Specialties */}
       <FormField control={form.control} name="hobbies" label="Hobbies/Especialidades" icon={Star} isTextarea={true} placeholder="Describe tus hobbies o talentos especiales..." />

    </div>
  );
}


function Step3({ form, socialControl }: { form: any, socialControl: any }) {
   const { fields, append, remove } = socialControl;
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-primary flex items-center gap-2"><Star className="text-accent" /> Experiencia y Redes Sociales</h3>
       <Separator />
        {/* Experience */}
       <FormField control={form.control} name="experience" label="Experiencia Relevante" icon={Star} isTextarea={true} placeholder="Describe cualquier experiencia previa en audiciones, entrenamiento, actuaciones, etc." />

       {/* Social Media */}
        <div className="space-y-3">
         <Label className="flex items-center gap-2"><LinkIcon className="text-accent" /> Redes Sociales (Opcional)</Label>
         {fields.map((field: any, index: number) => (
           <div key={field.id} className="flex items-end gap-2 p-3 border rounded-md bg-secondary/20">
             <FormField control={form.control} name={`socialMedia.${index}.platform`} label={`Plataforma ${index + 1}`} noIcon className="w-1/3">
                <Select onValueChange={(value) => form.setValue(`socialMedia.${index}.platform`, value)} defaultValue={field.platform}>
                  <SelectTrigger><SelectValue placeholder="Plataforma" /></SelectTrigger>
                  <SelectContent>{socialPlatforms.map(plat => <SelectItem key={plat} value={plat}>{plat}</SelectItem>)}</SelectContent>
                </Select>
              </FormField>
             <FormField control={form.control} name={`socialMedia.${index}.url`} label="URL" noIcon className="flex-1">
                <Input placeholder="https://..." {...form.register(`socialMedia.${index}.url`)} />
              </FormField>
             <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)} className="text-destructive hover:bg-destructive/10" aria-label="Eliminar red social">
               <Trash2 className="h-4 w-4" />
             </Button>
           </div>
         ))}
         <Button type="button" variant="outline" size="sm" onClick={() => append({ platform: '', url: '' })}>
           <PlusCircle className="mr-2 h-4 w-4" /> Añadir Red Social
         </Button>
         {form.formState.errors.socialMedia && <p className="text-sm text-destructive">{form.formState.errors.socialMedia.message || "Error en las URLs de redes sociales"}</p>}
       </div>
    </div>
  );
}


function Step4({ form, handleFileChange }: { form: any; handleFileChange: any }) {
   // Helper to display selected file name
   const getFileName = (fieldValue: any) => {
     if (fieldValue && fieldValue.length > 0 && fieldValue[0] instanceof File) {
       return fieldValue[0].name;
     }
     return "Ningún archivo seleccionado";
   };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-primary flex items-center gap-2"><ImageIcon className="text-accent" /> Adjuntar Fotos y Videos</h3>
       <Separator />
       <p className="text-sm text-muted-foreground">Asegúrate de que los archivos cumplen los requisitos de tamaño y formato.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         {/* Profile Photo */}
        <FileInputField
          control={form.control}
          name="profilePhoto"
          label="Foto de Perfil *"
          icon={ImageIcon}
          accept="image/*"
          onChange={handleFileChange}
          fileName={getFileName(form.watch('profilePhoto'))}
          description="Foto clara tipo carnet."
        />

        {/* Additional Photos */}
        <FileInputField
          control={form.control}
          name="additionalPhotos"
          label="Fotos Adicionales"
          icon={ImageIcon}
          accept="image/*"
          multiple={true} // Allow multiple files
          onChange={handleFileChange}
          fileName={form.watch('additionalPhotos')?.length > 0 ? `${form.watch('additionalPhotos').length} archivos seleccionados` : "Ningún archivo seleccionado"}
          description="Frontal, perfil, cuerpo completo."
        />

         {/* Audition Video */}
        <FileInputField
          control={form.control}
          name="auditionVideo"
          label="Video de Audición *"
          icon={Video}
          accept="video/*"
          onChange={handleFileChange}
          fileName={getFileName(form.watch('auditionVideo'))}
          description="Máx 2 minutos, 100MB."
        />

        {/* Presentation Video */}
        <FileInputField
          control={form.control}
          name="presentationVideo"
          label="Video de Presentación (Opcional)"
          icon={Video}
          accept="video/*"
          onChange={handleFileChange}
          fileName={getFileName(form.watch('presentationVideo'))}
          description="Preséntate brevemente."
        />
      </div>
    </div>
  );
}


function Step5({ form }: { form: any }) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-primary flex items-center gap-2"><FileCheck className="text-accent" /> Consentimiento y Envío</h3>
       <Separator />
       <div className="items-top flex space-x-2 p-4 border rounded-md bg-secondary/20">
         <Controller
           control={form.control}
           name="consent"
           render={({ field }) => (
             <Checkbox
               id="consent"
                checked={field.value}
                onCheckedChange={field.onChange}
                className="mt-1"
                aria-labelledby="consent-label"
             />
           )}
         />
        <div className="grid gap-1.5 leading-none">
          <label
            htmlFor="consent"
            id="consent-label"
             className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
             Acepto la recopilación y el uso de mi información personal de acuerdo con la <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-accent underline hover:text-accent/80">política de privacidad</a> de Novae.*
           </label>
           {form.formState.errors.consent && <p className="text-sm text-destructive mt-1">{form.formState.errors.consent.message}</p>}
         </div>
       </div>
       <p className="text-sm text-muted-foreground">
         Revisa toda la información antes de enviar. Una vez enviada, no podrás editarla directamente.
       </p>

       {/* Buttons like Preview/Save Draft would require additional logic */}
        <div className="flex gap-4">
          <Button type="button" variant="outline" disabled={true}>Guardar Borrador (Próximamente)</Button>
          <Button type="button" variant="outline" disabled={true}>Previsualizar (Próximamente)</Button>
        </div>
    </div>
  );
}

// --- Reusable Form Field Component ---
interface FormFieldProps {
  control: any;
  name: string;
  label: string;
  icon?: React.ElementType;
  placeholder?: string;
  disabled?: boolean;
  isTextarea?: boolean;
  children?: React.ReactNode; // For Select, Checkbox, etc.
  className?: string;
   noIcon?: boolean; // Option to hide the icon div
   description?: string; // Optional description below the field
}

function FormField({ control, name, label, icon: Icon, placeholder, disabled = false, isTextarea = false, children, className, noIcon = false, description }: FormFieldProps) {
  return (
     <div className={cn("space-y-2", className)}>
      <Label htmlFor={name} className={cn("flex items-center gap-2", noIcon && 'gap-0')}>
         {!noIcon && Icon && <Icon className="h-4 w-4 text-accent" />} {label}
      </Label>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <>
             {children ? (
               React.cloneElement(children as React.ReactElement, { ...field, id: name, disabled })
             ) : isTextarea ? (
              <Textarea id={name} placeholder={placeholder} {...field} disabled={disabled} aria-invalid={fieldState.invalid} />
             ) : (
              <Input id={name} type={name === 'email' ? 'email' : 'text'} placeholder={placeholder} {...field} disabled={disabled} aria-invalid={fieldState.invalid} />
             )}
             {description && <p className="text-xs text-muted-foreground pt-1">{description}</p>}
             {fieldState.error && <p className="text-sm text-destructive mt-1">{fieldState.error.message}</p>}
          </>
        )}
      />
    </div>
  );
}


// --- Reusable File Input Field Component ---
interface FileInputFieldProps extends FormFieldProps {
  accept: string;
  multiple?: boolean;
   onChange: (event: React.ChangeEvent<HTMLInputElement>, fieldName: keyof ApplicationFormData) => void;
  fileName: string; // To display the selected file name
}

function FileInputField({ control, name, label, icon: Icon, accept, multiple = false, onChange, fileName, description }: FileInputFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="flex items-center gap-2">
        {Icon && <Icon className="h-4 w-4 text-accent" />} {label}
      </Label>
       <Controller
        name={name}
        control={control}
        render={({ field: { value, ...fieldProps }, fieldState }) => ( // Exclude value from props passed to input
          <>
            <Input
              id={name}
              type="file"
              accept={accept}
              multiple={multiple}
               onChange={(e) => onChange(e, name as keyof ApplicationFormData)}
              disabled={control.formState.isSubmitting}
               className="block w-full text-sm text-foreground file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-accent file:text-accent-foreground hover:file:bg-accent/90 cursor-pointer"
               aria-describedby={`${name}-description`}
            />
            <p id={`${name}-description`} className="text-xs text-muted-foreground pt-1">
              {fileName} {description && `- ${description}`}
             </p>
             {fieldState.error && <p className="text-sm text-destructive mt-1">{fieldState.error.message}</p>}
          </>
        )}
      />
    </div>
  );
}

// Helper component for structure (optional)
// function FormSection({ title, icon: Icon, children }: { title: string, icon: React.ElementType, children: React.ReactNode }) {
//   return (
//     <div className="space-y-4">
//       <h3 className="text-lg font-medium text-primary flex items-center gap-2"><Icon className="text-accent" /> {title}</h3>
//       <Separator />
//       {children}
//     </div>
//   );
// }
