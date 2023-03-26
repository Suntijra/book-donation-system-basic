-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Mar 26, 2023 at 05:32 AM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `book_donation_center`
--

-- --------------------------------------------------------

--
-- Table structure for table `book`
--

CREATE TABLE `book` (
  `id` int(10) DEFAULT NULL,
  `uid` int(10) NOT NULL,
  `book_name` varchar(255) NOT NULL,
  `type` varchar(50) NOT NULL,
  `date_time_in` int(100) NOT NULL,
  `date_time_out` int(100) NOT NULL,
  `status` varchar(100) NOT NULL DEFAULT 'wait for storage',
  `detail` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`detail`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(10) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `fname` varchar(255) NOT NULL,
  `lname` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phoneno` varchar(20) NOT NULL,
  `lineID` varchar(50) NOT NULL,
  `datetime` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `level` varchar(100) NOT NULL DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `fname`, `lname`, `email`, `phoneno`, `lineID`, `datetime`, `level`) VALUES
(1, 'admin', '202cb962ac59075b964b07152d234b70', 'admin', 'admin', 'admin@gmail.com', '0210101001', '', '2023-03-03 08:55:50.000000', 'admin'),
(3, 'dom', '202cb962ac59075b964b07152d234b70', 'sunti', 'porkhamchan', 'saknsaza87@gmail.com', '0641076072', 'ddddlineid', '2023-03-25 18:01:06.703981', 'user'),
(4, '1111', 'b59c67bf196a4758191e42f76670ceba', '1111', '1111', '1111', '1111', '1111', '2023-03-25 18:02:12.516643', 'user'),
(5, '222', 'b6d767d2f8ed5d21a44b0e5886680cb9', '22222', '2222', '22222', '2222', '2222', '2023-03-25 18:05:55.343611', 'user'),
(6, '222', 'bcbe3365e6ac95ea2c0343a2395834dd', '22222', '222', '222', '222', '222', '2023-03-25 18:06:12.391211', 'user'),
(7, '333', 'bcbe3365e6ac95ea2c0343a2395834dd', '3333', '222', '222', '222', '222', '2023-03-25 18:06:39.984360', 'user'),
(8, 'dom', '202cb962ac59075b964b07152d234b70', '123123123', '1231231231', '23123123', '123123123', '1231231', '2023-03-25 18:09:13.318616', 'user'),
(9, 'dom123', '202cb962ac59075b964b07152d234b70', '11', '111', '11', '111', '111', '2023-03-25 18:09:34.686150', 'user'),
(10, 'dom1231', '202cb962ac59075b964b07152d234b70', '11', '111', '11', '111', '111', '2023-03-25 18:09:45.933602', 'user'),
(11, 'sunti123', 'f5bb0c8de146c67b44babbf4e6584cc0', 'sunti', 'porkhamchan', 'sunti.po61@rsu.ac.th', '0641076072', 'line_iddom', '2023-03-25 18:10:53.957718', 'user');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
