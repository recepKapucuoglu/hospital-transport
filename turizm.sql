-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Anamakine: localhost
-- Üretim Zamanı: 09 Eyl 2023, 00:44:37
-- Sunucu sürümü: 10.4.11-MariaDB
-- PHP Sürümü: 7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Veritabanı: `turizm`
--

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `aracs`
--

CREATE TABLE `aracs` (
  `id` int(11) NOT NULL,
  `model` varchar(60) DEFAULT NULL,
  `surucu_isim` varchar(70) DEFAULT NULL,
  `surucu_soyisim` varchar(70) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Tablo döküm verisi `aracs`
--

INSERT INTO `aracs` (`id`, `model`, `surucu_isim`, `surucu_soyisim`, `updated_at`, `created_at`) VALUES
(84, 'Mercedes', 'Ahmet', 'Yıldız', '2023-09-08 19:42:30', '2023-09-08 19:42:30'),
(85, 'transporter', 'Arif', 'Topal', '2023-09-08 19:43:38', '2023-09-08 19:43:38');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `transfers`
--

CREATE TABLE `transfers` (
  `id` int(10) UNSIGNED NOT NULL,
  `yolcu_id` int(11) NOT NULL,
  `arac_id` int(11) NOT NULL,
  `sefer_tarihi` date DEFAULT NULL,
  `sefer_saati` time DEFAULT NULL,
  `baslangic_noktasi` varchar(150) DEFAULT NULL,
  `bitis_noktasi` varchar(150) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Tablo döküm verisi `transfers`
--

INSERT INTO `transfers` (`id`, `yolcu_id`, `arac_id`, `sefer_tarihi`, `sefer_saati`, `baslangic_noktasi`, `bitis_noktasi`, `updated_at`, `created_at`) VALUES
(22, 121, 84, '2023-09-09', '01:42:00', 'İstanbul', 'Ankara', '2023-09-08 19:42:45', '2023-09-08 19:42:45'),
(23, 122, 85, '2023-09-10', '01:43:00', 'Bursa', 'İzmir', '2023-09-08 19:44:03', '2023-09-08 19:44:03');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `avatar` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT 'users/default.png',
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `settings` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Tablo döküm verisi `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `avatar`, `email_verified_at`, `password`, `remember_token`, `settings`, `created_at`, `updated_at`) VALUES
(2, 'Admin', 'admin@admin.com', 'users/default.png', NULL, '$2y$10$Y6a3Jgh2gqcCQ0WC9YqDhehBR30wdmrNLrmHkO3vzUphAXxTGiWHi', NULL, '{\"locale\":\"en\"}', '2023-01-04 03:43:22', '2023-01-11 06:14:29');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `yolcus`
--

CREATE TABLE `yolcus` (
  `id` int(10) UNSIGNED NOT NULL,
  `isim` varchar(150) DEFAULT NULL,
  `soyisim` varchar(170) DEFAULT NULL,
  `telefon` varchar(16) DEFAULT NULL,
  `yolcu_tipi_id` int(11) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Tablo döküm verisi `yolcus`
--

INSERT INTO `yolcus` (`id`, `isim`, `soyisim`, `telefon`, `yolcu_tipi_id`, `updated_at`, `created_at`) VALUES
(121, 'Recep', 'Kapucuoğlu', '05379571870', 1, '2023-09-08 19:42:16', '2023-09-08 19:42:16'),
(122, 'Mehmet', 'Okur', '0541132131', 2, '2023-09-08 19:43:09', '2023-09-08 19:43:09');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `yolcutipis`
--

CREATE TABLE `yolcutipis` (
  `id` int(10) UNSIGNED NOT NULL,
  `tip` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Tablo döküm verisi `yolcutipis`
--

INSERT INTO `yolcutipis` (`id`, `tip`) VALUES
(1, 'personel'),
(2, 'hasta');

--
-- Dökümü yapılmış tablolar için indeksler
--

--
-- Tablo için indeksler `aracs`
--
ALTER TABLE `aracs`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `transfers`
--
ALTER TABLE `transfers`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Tablo için indeksler `yolcus`
--
ALTER TABLE `yolcus`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `yolcutipis`
--
ALTER TABLE `yolcutipis`
  ADD PRIMARY KEY (`id`);

--
-- Dökümü yapılmış tablolar için AUTO_INCREMENT değeri
--

--
-- Tablo için AUTO_INCREMENT değeri `aracs`
--
ALTER TABLE `aracs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=86;

--
-- Tablo için AUTO_INCREMENT değeri `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Tablo için AUTO_INCREMENT değeri `transfers`
--
ALTER TABLE `transfers`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- Tablo için AUTO_INCREMENT değeri `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Tablo için AUTO_INCREMENT değeri `yolcus`
--
ALTER TABLE `yolcus`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=123;

--
-- Tablo için AUTO_INCREMENT değeri `yolcutipis`
--
ALTER TABLE `yolcutipis`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
