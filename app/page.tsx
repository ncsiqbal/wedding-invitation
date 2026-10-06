"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const wedding = {
  bride: "Nanda",
  groom: "Agung",

  brideFullName: "Dwi Nanda Rachmanto",
  groomFullName: "Agung Mustofa",

  brideParents:
    "Putri Kedua dari Bapak Budi Rachmanto dan Ibu Heriyah",

  groomParents:
    "Putra Kedua dari Bapak Bambang Sakri dan Ibu Mujiati",

  weddingDate: "10 Oktober 2026",

  dateISO: "2026-10-10T08:00:00+07:00",

  quote: "A moment to love, a lifetime to hold.",

  akad: {
    date: "Sabtu, 10 Oktober 2026",
    time: "08.00 - 11.00 WIB",
    address:
      "Perumahan Pesona Prima Cikahuripan 6 Blok B8/18, RT 02 RW 28, Desa Cikahuripan, Kecamatan Klapanunggal, Kabupaten Bogor",
  },

  reception: {
    date: "Sabtu, 10 Oktober 2026",
    time: "11.00 - 17.00 WIB",
    address:
      "Perumahan Pesona Prima Cikahuripan 6 Blok B8/18, RT 02 RW 28, Desa Cikahuripan, Kecamatan Klapanunggal, Kabupaten Bogor",
  },

  venue: "Perumahan Pesona Prima Cikahuripan 6",

  location:
    "Cikahuripan, Klapanunggal, Kabupaten Bogor",

  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Perumahan+Pesona+Prima+Cikahuripan+6+Blok+B8%2F18+Cikahuripan+Klapanunggal+Bogor",

  gift: {
    accounts: [
      {
        bank: "BSI",
        accountNumber: "73336896",
        accountName: "Agung Mustofa",
      },
      {
        bank: "BCA",
        accountNumber: "6871952539",
        accountName: "Dwi Nanda Rachmanto",
      },
    ],

    giftDeliveryUrl:
      "https://maps.app.goo.gl/VjQfry8GGEdsn93v8?g_st=aw",
  },

  music: "/music/wedding-music.mp3",
};

const story = [
  {
    number: "01",
    title: "Pertemuan",
    text: "Tidak ada yang terjadi secara kebetulan di dunia ini. Semua sudah diatur dengan sangat indah oleh Allah SWT. Kami tidak pernah menyangka bahwa pertemuan sederhana di akhir bulan Mei 2026 menjadi awal dari sebuah perjalanan panjang yang membawa kami sampai di titik ini.",
  },
  {
    number: "02",
    title: "Pendekatan",
    text: "Seiring berjalannya waktu, kedekatan itu tumbuh dengan sendirinya. Dari obrolan kecil yang sederhana, perlahan hadir rasa nyaman yang membuat kami ingin saling mengenal lebih jauh. Hingga akhirnya pada bulan Juni 2026, kami memutuskan untuk melangkah dalam sebuah hubungan.",
  },
  {
    number: "03",
    title: "Lamaran",
    text: "Perjalanan kami bukan tanpa ujian dan cerita. Namun setiap proses yang dilewati justru membawa kami semakin yakin satu sama lain. Sampai pada akhirnya, pada pertengahan Juni 2026 kami dipertemukan dalam sebuah ikatan yang penuh doa dan restu keluarga.",
  },
  {
    number: "04",
    title: "Pernikahan",
    text: 'Kami percaya, bukan karena bertemu lalu berjodoh. Tetapi karena berjodohlah, maka Allah mempertemukan kami dengan cara terbaik-Nya. Dan dengan penuh rasa syukur, kami memutuskan untuk mengikrarkan janji suci pernikahan pada 10 Oktober 2026. Sebagaimana perkataan Ali bin Abi Thalib : "Apa yang menjadi takdirmu, akan menemukan jalannya untuk menemukanmu."',
  },
];

const gallery = [
  "/images/gallery-01.jpeg",
  "/images/gallery-04.jpeg",
  "/images/gallery-03.jpeg",
  "/images/gallery-02.jpeg",
];

type Wish = {
  id: number;
  name: string;
  message: string;
  created_at: string;
};

export default function Home() {
  const [opened, setOpened] = useState(false);

  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [musicPlaying, setMusicPlaying] = useState(false);

  const [rsvpName, setRsvpName] = useState("");
  const [attendance, setAttendance] = useState("Hadir");
  const [guests, setGuests] = useState(1);
  const [rsvpMessage, setRsvpMessage] = useState("");

  const [rsvpLoading, setRsvpLoading] = useState(false);
  const [rsvpSuccess, setRsvpSuccess] = useState(false);
  const [rsvpError, setRsvpError] = useState("");

  const [wishName, setWishName] = useState("");
  const [wishMessage, setWishMessage] = useState("");

  const [wishes, setWishes] = useState<Wish[]>([]);
  const [wishLoading, setWishLoading] = useState(false);
  const [wishSuccess, setWishSuccess] = useState(false);
  const [wishError, setWishError] = useState("");

  useEffect(() => {

    loadWishes();
  }, []);

  useEffect(() => {
    const target = new Date(wedding.dateISO).getTime();

    const timer = setInterval(() => {
      const now = Date.now();
      const distance = target - now;

      if (distance <= 0) {
        setCountdown({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
        return;
      }

      setCountdown({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (distance / (1000 * 60 * 60)) % 24
        ),
        minutes: Math.floor(
          (distance / (1000 * 60)) % 60
        ),
        seconds: Math.floor(
          (distance / 1000) % 60
        ),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  async function loadWishes() {
    const { data, error } = await supabase
      .from("wishes")
      .select("*")
      .order("created_at", {
        ascending: false,
      })
      .limit(30);

    if (!error && data) {
      setWishes(data);
    }
  }

  async function submitRSVP(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setRsvpError("");
    setRsvpSuccess(false);

    if (!rsvpName.trim()) {
      setRsvpError("Silakan isi nama terlebih dahulu.");
      return;
    }

    setRsvpLoading(true);

    const { error } = await supabase.from("rsvps").insert({
      name: rsvpName.trim(),
      attendance,
      guests: attendance === "Hadir" ? guests : 0,
      message: rsvpMessage.trim(),
    });

    setRsvpLoading(false);

    if (error) {
      console.error(error);
      setRsvpError(
        "Maaf, RSVP belum berhasil dikirim. Silakan coba lagi."
      );
      return;
    }

    setRsvpSuccess(true);

    setRsvpName("");
    setRsvpMessage("");
    setGuests(1);
  }

  async function submitWish(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setWishError("");
    setWishSuccess(false);

    if (!wishName.trim() || !wishMessage.trim()) {
      setWishError(
        "Nama dan ucapan wajib diisi."
      );
      return;
    }

    setWishLoading(true);

    const { error } = await supabase.from("wishes").insert({
      name: wishName.trim(),
      message: wishMessage.trim(),
    });

    setWishLoading(false);

    if (error) {
      console.error(error);
      setWishError(
        "Ucapan belum berhasil dikirim. Silakan coba lagi."
      );
      return;
    }

    setWishSuccess(true);

    setWishName("");
    setWishMessage("");

    await loadWishes();
  }

  function copyAccount(accountNumber: string) {
    navigator.clipboard.writeText(accountNumber);

    alert("Nomor rekening berhasil disalin.");
  }

  function toggleMusic() {
    const audio = document.getElementById(
      "wedding-audio"
    ) as HTMLAudioElement | null;

    if (!audio) return;

    if (musicPlaying) {
      audio.pause();
      setMusicPlaying(false);
    } else {
      audio
        .play()
        .then(() => {
          setMusicPlaying(true);
        })
        .catch(() => {
          setMusicPlaying(false);
        });
    }
  }

  return (
    <>
      <audio
        id="wedding-audio"
        src={wedding.music}
        loop
      />

      {!opened && (
        <div className="opening">
          <div className="opening-inner">
            <p className="eyebrow">
              THE WEDDING OF
            </p>

            <h1>
              Agung
              <span>&</span>
              Nanda
            </h1>

            <div className="opening-line" />

              <p className="opening-date">
                {wedding.weddingDate}
              </p>

            <button
              className="primary-button"
              onClick={() => setOpened(true)}
            >
              BUKA UNDANGAN
            </button>
          </div>
        </div>
      )}

      <main
        className={`main-content ${
          !opened ? "is-locked" : ""
        }`}
      >
        <button
          className="music-button"
          onClick={toggleMusic}
          aria-label="Music"
        >
          {musicPlaying ? "Ⅱ" : "♪"}
        </button>

        <section className="hero-section">
          <p className="eyebrow">
            THE WEDDING OF
          </p>

          <h1 className="hero-title">
            Agung
            <span>&</span>
            Nanda
          </h1>

          <p className="hero-date">
            {wedding.weddingDate}
          </p>

          <div className="hero-line" />

          <p className="hero-location">
            {wedding.location}
          </p>
        </section>

        <section className="intro-section">
          <p className="section-label">
            ASSALAMUALAIKUM
          </p>

          <h2>
            Dengan penuh rasa syukur,
            <br />
            kami mengundang Anda
          </h2>

          <p>
            Untuk menjadi bagian dari hari
            bahagia kami, saat dua hati
            mengikat janji untuk berjalan
            bersama dalam sebuah kehidupan
            yang baru.
          </p>
        </section>

        <section className="countdown-section">
          <p className="section-label">
            COUNTING DOWN TO
          </p>

          <h2>{wedding.weddingDate}</h2>

          <div className="countdown">
            <div>
              <strong>{countdown.days}</strong>
              <span>Hari</span>
            </div>

            <div>
              <strong>{countdown.hours}</strong>
              <span>Jam</span>
            </div>

            <div>
              <strong>{countdown.minutes}</strong>
              <span>Menit</span>
            </div>

            <div>
              <strong>{countdown.seconds}</strong>
              <span>Detik</span>
            </div>
          </div>
        </section>

      <section className="couple-section">

        <p className="section-label">
          THE COUPLE
        </p>

        {/* THE GROOM */}
        <div className="person-profile">

          <p className="person-label">
            THE GROOM
          </p>

          <div className="portrait-frame">
            <img
              src="/images/agung.jpg"
              alt="Agung Mustofa"
            />
          </div>

          <h3>
            {wedding.groomFullName}
          </h3>

          <p className="person-parents">
            Putra Kedua dari
            <br />
            Bapak Bambang Sakri
            <br />
            dan Ibu Mujiati
          </p>

        </div>

        {/* & */}
        <div className="couple-symbol">
          &
        </div>

        {/* THE BRIDE */}
        <div className="person-profile">

          <p className="person-label">
            THE BRIDE
          </p>

          <div className="portrait-frame">
            <img
              src="/images/nanda.jpg"
              alt="Dwi Nanda Rachmanto"
            />
          </div>

          <h3>
            {wedding.brideFullName}
          </h3>

          <p className="person-parents">
            Putri Kedua dari
            <br />
            Bapak Budi Rachmanto
            <br />
            dan Ibu Heriyah
          </p>

        </div>

      </section>

        <section className="story-section">
          <p className="section-label">
            OUR STORY
          </p>

          <h2>
            A journey
            <br />
            written by destiny.
          </h2>

          <div className="story-timeline">
            {story.map((item) => (
              <article
                className="story-item"
                key={item.number}
              >
                <div className="story-number">
                  {item.number}
                </div>

                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="gallery-section">
          <p className="section-label">
            OUR MOMENTS
          </p>

          <h2>
            Little moments,
            <br />
            forever memories.
          </h2>

          <div className="gallery-grid">
            {gallery.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Agung dan Nanda ${index + 1}`}
              />
            ))}
          </div>
        </section>

        <section className="event-section">
          <p className="section-label">
            SAVE THE DATE
          </p>

          <h2>
            The day
            <br />
            we say "I do."
          </h2>

          <div className="event-card">
            <p className="event-type">
              AKAD NIKAH
            </p>

            <h3>{wedding.akad.date}</h3>

            <p className="event-time">
              {wedding.akad.time}
            </p>

            <p className="event-address">
              {wedding.akad.address}
            </p>

            <a
              href={wedding.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="outline-button"
            >
              LIHAT LOKASI
            </a>
          </div>

          <div className="event-card">
            <p className="event-type">
              RESEPSI
            </p>

            <h3>{wedding.reception.date}</h3>

            <p className="event-time">
              {wedding.reception.time}
            </p>

            <p className="event-address">
              {wedding.reception.address}
            </p>

            <a
              href={wedding.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="outline-button"
            >
              LIHAT LOKASI
            </a>
          </div>
        </section>

                <section className="gift-section">
          <p className="section-label">
            WEDDING GIFT
          </p>

          <h2>
            Your presence
            <br />
            is our greatest gift.
          </h2>

          <p>
            Doa dan kehadiran Anda adalah
            hadiah terindah bagi kami.
            Namun apabila ingin memberikan
            tanda kasih, dapat melalui:
          </p>

          <div className="gift-options">

            {/* REKENING AGUNG */}
            <div className="gift-card">
              <p className="gift-bank">
                {wedding.gift.accounts[0].bank}
              </p>

              <strong>
                {wedding.gift.accounts[0].accountNumber}
              </strong>

              <span>
                a.n. {wedding.gift.accounts[0].accountName}
              </span>

              <button
                onClick={() =>
                  copyAccount(
                    wedding.gift.accounts[0].accountNumber
                  )
                }
                className="outline-button"
              >
                SALIN NOMOR REKENING
              </button>
            </div>

            {/* REKENING NANDA */}
            <div className="gift-card">
              <p className="gift-bank">
                {wedding.gift.accounts[1].bank}
              </p>

              <strong>
                {wedding.gift.accounts[1].accountNumber}
              </strong>

              <span>
                a.n. {wedding.gift.accounts[1].accountName}
              </span>

              <button
                onClick={() =>
                  copyAccount(
                    wedding.gift.accounts[1].accountNumber
                  )
                }
                className="outline-button"
              >
                SALIN NOMOR REKENING
              </button>
            </div>

            {/* KADO */}
            <div className="gift-card gift-delivery-card">
              <p className="gift-bank">
                KIRIM KADO
              </p>

              <div className="gift-icon">
                ♡
              </div>

              <span>
                Untuk mengirimkan kado secara langsung,
                silakan menuju lokasi berikut.
              </span>

              <a
                href={wedding.gift.giftDeliveryUrl}
                target="_blank"
                rel="noreferrer"
                className="outline-button"
              >
                LIHAT LOKASI KADO
              </a>
            </div>

          </div>
        </section>

        <section className="rsvp-section">
          <p className="section-label">
            RSVP
          </p>

          <h2>
            Will you
            <br />
            join us?
          </h2>

          <p>
            Mohon konfirmasi kehadiran Anda
            agar kami dapat mempersiapkan
            hari bahagia ini dengan sebaik
            mungkin.
          </p>

          <form
            className="rsvp-form"
            onSubmit={submitRSVP}
          >
            <input
              type="text"
              placeholder="Nama"
              value={rsvpName}
              onChange={(e) =>
                setRsvpName(e.target.value)
              }
            />

            <select
              value={attendance}
              onChange={(e) =>
                setAttendance(e.target.value)
              }
            >
              <option value="Hadir">
                Saya akan hadir
              </option>

              <option value="Tidak Hadir">
                Saya tidak dapat hadir
              </option>
            </select>

            {attendance === "Hadir" && (
              <select
                value={guests}
                onChange={(e) =>
                  setGuests(Number(e.target.value))
                }
              >
                <option value={1}>
                  1 orang
                </option>

                <option value={2}>
                  2 orang
                </option>

                <option value={3}>
                  3 orang
                </option>

                <option value={4}>
                  4 orang
                </option>
              </select>
            )}

            <textarea
              placeholder="Pesan untuk Agung & Nanda"
              value={rsvpMessage}
              onChange={(e) =>
                setRsvpMessage(e.target.value)
              }
              rows={4}
            />

            {rsvpError && (
              <p className="form-error">
                {rsvpError}
              </p>
            )}

            {rsvpSuccess && (
              <p className="form-success">
                Terima kasih! Konfirmasi
                kehadiran Anda sudah kami terima
                🤍
              </p>
            )}

            <button
              type="submit"
              className="primary-button"
              disabled={rsvpLoading}
            >
              {rsvpLoading
                ? "MENGIRIM..."
                : "KIRIM KONFIRMASI"}
            </button>
          </form>
        </section>

        <section className="wishes-section">
          <p className="section-label">
            WEDDING WISHES
          </p>

          <h2>
            Leave a little
            <br />
            love for us.
          </h2>

          <form
            className="wish-form"
            onSubmit={submitWish}
          >
            <input
              type="text"
              placeholder="Nama"
              value={wishName}
              onChange={(e) =>
                setWishName(e.target.value)
              }
            />

            <textarea
              placeholder="Tulis ucapan..."
              rows={4}
              value={wishMessage}
              onChange={(e) =>
                setWishMessage(e.target.value)
              }
            />

            {wishError && (
              <p className="form-error">
                {wishError}
              </p>
            )}

            {wishSuccess && (
              <p className="form-success">
                Ucapan berhasil dikirim 🤍
              </p>
            )}

            <button
              type="submit"
              className="outline-button"
              disabled={wishLoading}
            >
              {wishLoading
                ? "MENGIRIM..."
                : "KIRIM UCAPAN"}
            </button>
          </form>

          <div className="wish-list">
            {wishes.length === 0 ? (
              <p className="empty-wishes">
                Jadilah yang pertama memberikan
                ucapan 🤍
              </p>
            ) : (
              wishes.map((wish) => (
                <article
                  className="wish-item"
                  key={wish.id}
                >
                  <strong>{wish.name}</strong>

                  <p>{wish.message}</p>
                </article>
              ))
            )}
          </div>
        </section>

        <section className="closing-section">
          <p className="section-label">
            WITH LOVE
          </p>

          <h2>
            Agung
            <span>&</span>
            Nanda
          </h2>

          <p>
            “Apa yang menjadi takdirmu,
            akan menemukan jalannya untuk
            menemukanmu.”
          </p>

          <div className="closing-line" />

          <p className="closing-date">
            {wedding.weddingDate}
          </p>
        </section>
      </main>
    </>
  );
}