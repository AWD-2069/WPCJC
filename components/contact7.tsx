import { Mail, MapPin, Phone } from "lucide-react";

interface Contact7Props {
  title?: string;
  description?: string;
  emailLabel?: string;
  emailDescription?: string;
  email?: string;
  officeLabel?: string;
  officeDescription?: string;
  officeAddress?: string;
  phoneLabel?: string;
  phoneDescription?: string;
  phone?: string;
  elpPhoneLabel?: string; // Early Learning Program phone label
  elpPhoneDescription?: string;
  elpPhone?: string;
}

const Contact7 = ({
  title = "Contact Us",
  description = "Contact Westminster Presbyterian Church for any inquiries or assistance.",
  emailLabel = "Email",
  emailDescription = "",
  email = "info@wpcjc.org",
  officeLabel = "Address",
  officeDescription = "",
  officeAddress = "2343 Knob Creek Road, Johnson City, TN 37604",
  phoneLabel = "Main Phone",
  phoneDescription = "",
  phone = "+1 423-283-4643",
  elpPhoneLabel = "Early Learning Program",
  elpPhoneDescription = "",
  elpPhone = "+1 423-328-3428",
}: Contact7Props) => {
  return (
    <section className="bg-background py-16">
      <div className="container">
        <div className="mb-14">
          <h2 className="mt-2 mb-3 text-3xl font-semibold text-balance md:text-4xl">
            {title}
          </h2>
          <p className="max-w-xl text-lg text-muted-foreground">
            {description}
          </p>
        </div>
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <span className="mb-3 flex size-12 flex-col items-center justify-center rounded-full bg-accent">
              <Mail className="h-6 w-auto" />
            </span>
            <p className="mb-2 text-lg font-semibold">{emailLabel}</p>
            <p className="mb-3 text-muted-foreground">{emailDescription}</p>
            <a
              href={`mailto:${email}`}
              className="font-semibold hover:underline"
            >
              {email}
            </a>
          </div>
          <div>
            <span className="mb-3 flex size-12 flex-col items-center justify-center rounded-full bg-accent">
              <MapPin className="h-6 w-auto" />
            </span>
            <p className="mb-2 text-lg font-semibold">{officeLabel}</p>
            <p className="mb-3 text-muted-foreground">{officeDescription}</p>
            <a href="#" className="font-semibold hover:underline">
              {officeAddress}
            </a>
          </div>
          <div>
            <span className="mb-3 flex size-12 flex-col items-center justify-center rounded-full bg-accent">
              <Phone className="h-6 w-auto" />
            </span>
            <p className="mb-2 text-lg font-semibold">{phoneLabel}</p>
            <p className="mb-3 text-muted-foreground">{phoneDescription}</p>
            <a href={`tel:${phone}`} className="font-semibold hover:underline">
              {phone}
            </a>
            <div className="mt-6">
              <p className="mb-2 text-lg font-semibold">{elpPhoneLabel}</p>
              <p className="mb-3 text-muted-foreground">{elpPhoneDescription}</p>
              <a href={`tel:${elpPhone}`} className="font-semibold hover:underline">
                {elpPhone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Contact7 };
