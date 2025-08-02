import { Mail, MapPin, Phone } from "lucide-react";
import React from "react";

interface Contact7Props {
  email?: { email: string }[];
  address?: { address: string }[];
  phone?: { phone: string }[];
}

const Contact7: React.FC<Contact7Props> = ({
  email = [],
  address = [],
  phone = [],
}) => {
  const emailLabel = email.length === 1 ? "Email" : "Emails";
  const addressLabel = address.length === 1 ? "Address" : "Addresses";
  const phoneLabel = phone.length === 1 ? "Phone" : "Phones";

  return (
    <section className="bg-background py-16" aria-labelledby="contact-title">
      <div className="container">
        <div className="mb-14">
          <h2 id="contact-title" className="mt-2 mb-3 text-3xl font-semibold text-balance md:text-4xl">
            Contact Us
          </h2>
          <p className="max-w-xl text-lg text-muted-foreground">
            Contact Westminster Presbyterian Church for any inquiries or assistance.
          </p>
        </div>
        <div className="grid gap-10 md:grid-cols-3">
          {/* Emails */}
          <div>
            <span
              className="mb-3 flex size-12 flex-col items-center justify-center rounded-full bg-primary"
              aria-label={emailLabel}
            >
              <Mail className="h-6 w-auto text-white" />
            </span>
            <p className="mb-2 text-lg font-semibold">{emailLabel}</p>
            {email.map((e, i) =>
              e.email ? (
                <div key={i}>
                  <a
                    href={`mailto:${e.email}`}
                    className="font-semibold hover:underline block"
                    aria-label="Email"
                  >
                    {e.email}
                  </a>
                </div>
              ) : null
            )}
          </div>
          {/* Addresses */}
          <div>
            <span
              className="mb-3 flex size-12 flex-col items-center justify-center rounded-full bg-primary"
              aria-label={addressLabel}
            >
              <MapPin className="h-6 w-auto text-white" />
            </span>
            <p className="mb-2 text-lg font-semibold">{addressLabel}</p>
            {address.map((a, i) =>
              a.address ? (
                <div key={i}>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(a.address)}`}
                    className="font-semibold hover:underline block"
                    aria-label="Address"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {a.address}
                  </a>
                </div>
              ) : null
            )}
          </div>
          {/* Phones */}
          <div>
            <span
              className="mb-3 flex size-12 flex-col items-center justify-center rounded-full bg-primary"
              aria-label={phoneLabel}
            >
              <Phone className="h-6 w-auto text-white" />
            </span>
            <p className="mb-2 text-lg font-semibold">{phoneLabel}</p>
            {phone.map((p, i) =>
              p.phone ? (
                <div key={i}>
                  <a
                    href={`tel:${p.phone}`}
                    className="font-semibold hover:underline block"
                    aria-label="Phone"
                  >
                    {p.phone}
                  </a>
                </div>
              ) : null
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export { Contact7 };
