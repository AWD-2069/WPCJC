import { Mail, MapPin, Phone } from "lucide-react";
import React from "react";

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
  elpPhoneLabel?: string;
  elpPhoneDescription?: string;
  elpPhone?: string;
}

const ContactCard: React.FC<{
  icon: React.ReactNode;
  label?: string;
  description?: string;
  link?: string;
  linkText?: string;
  ariaLabel?: string;
}> = ({ icon, label, description, link, linkText, ariaLabel }) => {
  if (!label && !linkText) return null;
  return (
    <div>
      <span
        className="mb-3 flex size-12 flex-col items-center justify-center rounded-full bg-primary"
        aria-label={ariaLabel}
      >
        {icon}
      </span>
      {label && <p className="mb-2 text-lg font-semibold">{label}</p>}
      {description && <p className="mb-3 text-muted-foreground">{description}</p>}
      {link && linkText && (
        <a
          href={link}
          className="font-semibold hover:underline"
          aria-label={ariaLabel}
          target={link.startsWith("http") ? "_blank" : undefined}
          rel={link.startsWith("http") ? "noopener noreferrer" : undefined}
        >
          {linkText}
        </a>
      )}
    </div>
  );
};

const Contact7: React.FC<Contact7Props> = ({
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
}) => {
  const mapLink = officeAddress
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        officeAddress
      )}`
    : undefined;

  return (
    <section className="bg-background py-16" aria-labelledby="contact-title">
      <div className="container">
        <div className="mb-14">
          <h2
            id="contact-title"
            className="mt-2 mb-3 text-3xl font-semibold text-balance md:text-4xl"
          >
            {title}
          </h2>
          <p className="max-w-xl text-lg text-muted-foreground">{description}</p>
        </div>
        <div className="grid gap-10 md:grid-cols-3">
          <ContactCard
            icon={<Mail className="h-6 w-auto text-white" />}
            label={emailLabel}
            description={emailDescription}
            link={email ? `mailto:${email}` : undefined}
            linkText={email}
            ariaLabel="Email"
          />
          <ContactCard
            icon={<MapPin className="h-6 w-auto text-white" />}
            label={officeLabel}
            description={officeDescription}
            link={mapLink}
            linkText={officeAddress}
            ariaLabel="Address"
          />
          <div>
            <ContactCard
              icon={<Phone className="h-6 w-auto text-white" />}
              label={phoneLabel}
              description={phoneDescription}
              link={phone ? `tel:${phone}` : undefined}
              linkText={phone}
              ariaLabel="Main Phone"
            />
            {(elpPhone || elpPhoneLabel) && (
              <div className="mt-6">
                <ContactCard
                  icon={<Phone className="h-6 w-auto text-white" />}
                  label={elpPhoneLabel}
                  description={elpPhoneDescription}
                  link={elpPhone ? `tel:${elpPhone}` : undefined}
                  linkText={elpPhone}
                  ariaLabel="Early Learning Program Phone"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export { Contact7 };
