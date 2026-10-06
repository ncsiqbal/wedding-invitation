"use client";

import { useEffect, useState } from "react";

type Guest = {
  id: number;
  name: string;
  url: string;
};

export default function AdminPage() {
  const [name, setName] = useState("");
  const [guests, setGuests] = useState<Guest[]>([]);
  const [generatedUrl, setGeneratedUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("wedding-guests");

    if (saved) {
      setGuests(JSON.parse(saved));
    }
  }, []);

  const generateLink = () => {
    const trimmedName = name.trim();

    if (!trimmedName) {
      alert("Silakan isi nama tamu terlebih dahulu.");
      return;
    }

    const url = `${window.location.origin}/?to=${encodeURIComponent(
      trimmedName
    )}`;

    setGeneratedUrl(url);
    setCopied(false);

    const newGuest: Guest = {
      id: Date.now(),
      name: trimmedName,
      url,
    };

    const updatedGuests = [newGuest, ...guests];

    setGuests(updatedGuests);
    localStorage.setItem(
      "wedding-guests",
      JSON.stringify(updatedGuests)
    );

    setName("");
  };

  const copyLink = async (url: string) => {
    await navigator.clipboard.writeText(url);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const deleteGuest = (id: number) => {
    const updatedGuests = guests.filter(
      (guest) => guest.id !== id
    );

    setGuests(updatedGuests);

    localStorage.setItem(
      "wedding-guests",
      JSON.stringify(updatedGuests)
    );
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f5efe6",
        padding: "40px 20px",
        color: "#30231d",
        fontFamily: "Montserrat, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "700px",
          margin: "0 auto",
        }}
      >
        {/* HEADER */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "45px",
          }}
        >
          <p
            style={{
              fontSize: "9px",
              letterSpacing: "4px",
              color: "#aa8963",
              marginBottom: "15px",
            }}
          >
            AGUNG & NANDA
          </p>

          <h1
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "48px",
              fontWeight: 400,
              margin: 0,
              lineHeight: 1,
            }}
          >
            Guest Invitation
          </h1>

          <p
            style={{
              marginTop: "15px",
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "18px",
              color: "#604b3d",
            }}
          >
            Buat link undangan untuk setiap tamu
          </p>
        </div>

        {/* GENERATOR CARD */}
        <div
          style={{
            background: "#faf7f2",
            border: "1px solid #d9ccbd",
            padding: "30px",
          }}
        >
          <label
            style={{
              display: "block",
              fontSize: "9px",
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "#aa8963",
              marginBottom: "10px",
            }}
          >
            Nama Tamu
          </label>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                generateLink();
              }
            }}
            placeholder="Contoh: Bapak Andi"
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "15px",
              border: "1px solid #d9ccbd",
              background: "#fff",
              outline: "none",
              fontFamily: "Montserrat, sans-serif",
              fontSize: "13px",
              color: "#30231d",
            }}
          />

          <button
            onClick={generateLink}
            style={{
              width: "100%",
              marginTop: "15px",
              padding: "15px",
              border: "1px solid #604b3d",
              background: "#604b3d",
              color: "#fff",
              cursor: "pointer",
              fontSize: "9px",
              letterSpacing: "3px",
              fontWeight: 500,
            }}
          >
            GENERATE LINK
          </button>

          {/* GENERATED LINK */}
          {generatedUrl && (
            <div
              style={{
                marginTop: "25px",
                paddingTop: "25px",
                borderTop: "1px solid #d9ccbd",
              }}
            >
              <p
                style={{
                  fontSize: "9px",
                  letterSpacing: "2px",
                  color: "#aa8963",
                  marginBottom: "10px",
                }}
              >
                LINK BERHASIL DIBUAT
              </p>

              <div
                style={{
                  padding: "12px",
                  background: "#f5efe6",
                  border: "1px solid #d9ccbd",
                  fontSize: "11px",
                  lineHeight: 1.5,
                  wordBreak: "break-all",
                }}
              >
                {generatedUrl}
              </div>

              <button
                onClick={() => copyLink(generatedUrl)}
                style={{
                  width: "100%",
                  marginTop: "10px",
                  padding: "13px",
                  border: "1px solid #aa8963",
                  background: "transparent",
                  color: "#604b3d",
                  cursor: "pointer",
                  fontSize: "9px",
                  letterSpacing: "2px",
                }}
              >
                {copied ? "LINK COPIED ✓" : "COPY LINK"}
              </button>
            </div>
          )}
        </div>

        {/* GUEST LIST */}
        <div style={{ marginTop: "45px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <p
              style={{
                fontSize: "9px",
                letterSpacing: "3px",
                color: "#aa8963",
                margin: 0,
              }}
            >
              GENERATED GUESTS
            </p>

            <span
              style={{
                fontSize: "11px",
                color: "#806f63",
              }}
            >
              {guests.length} tamu
            </span>
          </div>

          {guests.length === 0 ? (
            <div
              style={{
                padding: "30px",
                textAlign: "center",
                border: "1px solid #d9ccbd",
                color: "#806f63",
                fontFamily: "Cormorant Garamond, serif",
                fontSize: "17px",
              }}
            >
              Belum ada link tamu yang dibuat.
            </div>
          ) : (
            guests.map((guest) => (
              <div
                key={guest.id}
                style={{
                  background: "#faf7f2",
                  border: "1px solid #d9ccbd",
                  padding: "18px",
                  marginBottom: "10px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "15px",
                    alignItems: "center",
                  }}
                >
                  <div style={{ minWidth: 0 }}>
                    <p
                      style={{
                        margin: 0,
                        fontFamily:
                          "Cormorant Garamond, serif",
                        fontSize: "22px",
                      }}
                    >
                      {guest.name}
                    </p>

                    <p
                      style={{
                        marginTop: "5px",
                        marginBottom: 0,
                        fontSize: "9px",
                        color: "#806f63",
                        wordBreak: "break-all",
                      }}
                    >
                      {guest.url}
                    </p>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      gap: "6px",
                      flexShrink: 0,
                    }}
                  >
                    <button
                      onClick={() => copyLink(guest.url)}
                      style={{
                        padding: "9px 12px",
                        border: "1px solid #aa8963",
                        background: "transparent",
                        color: "#604b3d",
                        cursor: "pointer",
                        fontSize: "8px",
                        letterSpacing: "1px",
                      }}
                    >
                      COPY
                    </button>

                    <button
                      onClick={() => deleteGuest(guest.id)}
                      style={{
                        padding: "9px 12px",
                        border: "1px solid #d9ccbd",
                        background: "transparent",
                        color: "#806f63",
                        cursor: "pointer",
                        fontSize: "8px",
                      }}
                    >
                      ×
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* NOTE */}
        <p
          style={{
            marginTop: "40px",
            textAlign: "center",
            fontSize: "9px",
            lineHeight: 1.7,
            color: "#806f63",
          }}
        >
          Data nama tamu tersimpan di browser ini.
          <br />
          Tidak tersimpan di database.
        </p>
      </div>
    </main>
  );
}