-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- 主机： 127.0.0.1:3307
-- 生成日期： 2019-11-19 13:05:10
-- 服务器版本： 10.3.14-MariaDB
-- PHP 版本： 7.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 数据库： `lruihao`
--

-- --------------------------------------------------------

--
-- 表的结构 `comments`
--

DROP TABLE IF EXISTS `comments`;
CREATE TABLE IF NOT EXISTS `comments` (
  `cm_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '評論ID',
  `cm_nick` varchar(100) COLLATE utf8_bin DEFAULT NULL COMMENT '昵稱',
  `cm_email` varchar(100) COLLATE utf8_bin DEFAULT NULL COMMENT '郵箱',
  `cm_content` varchar(2000) COLLATE utf8_bin NOT NULL COMMENT '評論',
  `cm_avatar` varchar(100) COLLATE utf8_bin NOT NULL COMMENT '頭像',
  `cm_date` date DEFAULT NULL COMMENT '日期',
  PRIMARY KEY (`cm_id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- 转存表中的数据 `comments`
--

INSERT INTO `comments` (`cm_id`, `cm_nick`, `cm_email`, `cm_content`, `cm_avatar`, `cm_date`) VALUES
(1, 'Cell', '1074627678@qq.com', 'hello world!\r\n沙發！', 'https://www.gravatar.com/avatar/3f985efb5907ca52944a3cd7edd51606?s=80&d=wavatar&r=g', '2019-10-21'),
(2, 'Cell', '1074627678@qq.com', '板凳！', 'https://www.gravatar.com/avatar/3f985efb5907ca52944a3cd7edd51606?s=80&d=wavatar&r=g', '2019-10-21'),
(3, 'Cell', '1074627678@qq.com', '前排賣瓜子花生，啤酒小龍蝦！', 'https://www.gravatar.com/avatar/3f985efb5907ca52944a3cd7edd51606?s=80&d=wavatar&r=g', '2019-10-21'),
(4, 'Anonymous', '', '老闆！還有盒飯不！', 'https://www.gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e?s=80&d=wavatar&r=g', '2019-10-21'),
(5, 'Anonymous', '', '還有啊，要什麽味道的！', 'https://www.gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e?s=80&d=wavatar&r=g', '2019-10-21'),
(6, 'Anonymous', '', '我要榴槤小龍蝦味的，多加點飯！', 'https://www.gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e?s=80&d=wavatar&r=g', '2019-10-21'),
(7, 'Anonymous', '', 'test', 'https://www.gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e?s=80&d=wavatar&r=g', '2019-10-22'),
(8, 'f1684914', '', 'test too!', 'https://www.gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e?s=80&d=wavatar&r=g', '2019-10-22'),
(9, 'Anonymous', '2194808383@qq.com', 'test 3', 'https://www.gravatar.com/avatar/c90411580568fab8ebecbb0e3a95b291?s=80&d=wavatar&r=g', '2019-10-22'),
(10, 'f1684914', 'test1@mail.foxconn.com', '郵箱測試！', 'https://www.gravatar.com/avatar/514d8a086101d9ca0ef1a8353f27be0c?s=80&d=wavatar&r=g', '2019-10-22'),
(11, 'Anonymous', 'test2@mail.foxconn.com', '換個郵箱試試看！', 'https://www.gravatar.com/avatar/c1092883fb56bccd98c49b80d7e5829e?s=80&d=wavatar&r=g', '2019-10-22'),
(12, '張三', 'test3@mail.foxconn.com', '再換個郵箱看看!', 'https://www.gravatar.com/avatar/809905890dd73ac972b355e2d19b6290?s=80&d=wavatar&r=g', '2019-10-22'),
(13, '李四', 'test4@mail.foxconn.com', '我又換了一個郵箱！', 'https://www.gravatar.com/avatar/e96b326a4bb571ab750ecdb341acdd4d?s=80&d=wavatar&r=g', '2019-10-22'),
(14, '王麻子', 'test5@mail.foxconn.com', '最後一次好吧，再換一個郵箱！', 'https://www.gravatar.com/avatar/5bf913aa1c6363c0c02f45e040a2c930?s=80&d=wavatar&r=g', '2019-10-22'),
(15, '123', '1005760694@qq.com', '123', 'https://www.gravatar.com/avatar/f74871618c521bee4c0947c29738b7b4?s=80&d=wavatar&r=g', '2019-10-22'),
(16, '孫八', 'test6@mail.foxconn.com', '哈哈哈哈，我才是最後一個評論的！', 'https://www.gravatar.com/avatar/90e67f83bad8c1d027427638b00eeb3f?s=80&d=wavatar&r=g', '2019-10-22'),
(17, 'Anonymous', '', '啦啦啦啦啦', 'https://www.gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e?s=80&d=wavatar&r=g', '2019-10-26'),
(18, '蒙奇d•D•路飛', 'onepiece@op.com', '大家好，我是路飛。我只想說一句：海賊王，我當定了！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！', 'https://www.gravatar.com/avatar/983e0e48509fd12aafc16959b90d71aa?s=80&d=wavatar&r=g', '2019-10-26'),
(19, '蒙奇.D.卡普', 'hxbpandaoh@163.com', '漢皇重色思傾國，御宇多年求不得。楊家有女初長成，養在深閨人未識。\r\n天生麗質難自棄，一朝選在君王側。回眸一笑百媚生，六宮粉黛無顏色。\r\n春寒賜浴華清池，溫泉水滑洗凝脂。侍兒扶起嬌無力，始是新承恩澤時。\r\n雲鬢花顏金步搖，芙蓉帳暖度春宵。春宵苦短日高起，從此君王不早朝。\r\n承歡侍宴無閒暇，春從春遊夜專夜。後宮佳麗三千人，三千寵愛在一身。\r\n金屋妝成嬌侍夜，玉樓宴罷醉和春。姊妹弟兄皆列土，可憐光彩生門戶。\r\n遂令天下父母心，不重生男重生女。驪宮高處入青雲，仙樂風飄處處聞。\r\n緩歌慢舞凝絲竹，盡日君王看不足。漁陽鼙鼓動地來，驚破霓裳羽衣曲。', 'https://www.gravatar.com/avatar/62159c6ce17d850773e7f217eb2991ba?s=80&d=wavatar&r=g', '2019-10-28'),
(21, 'Anonymous', '', '承蒙时光不弃', 'https://www.gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e?s=80&d=wavatar&r=g', '2019-11-19');

-- --------------------------------------------------------

--
-- 表的结构 `reward_pool`
--

DROP TABLE IF EXISTS `reward_pool`;
CREATE TABLE IF NOT EXISTS `reward_pool` (
  `rp_id` int(10) NOT NULL AUTO_INCREMENT COMMENT '獎品編號',
  `rp_name` varchar(30) COLLATE utf8mb4_bin NOT NULL COMMENT '獎品名稱',
  `rp_create_datetime` datetime NOT NULL DEFAULT current_timestamp() COMMENT '建立時間',
  `rp_used_datetime` datetime DEFAULT NULL COMMENT '領取時間',
  PRIMARY KEY (`rp_id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin COMMENT='獎品池';

--
-- 转存表中的数据 `reward_pool`
--

INSERT INTO `reward_pool` (`rp_id`, `rp_name`, `rp_create_datetime`, `rp_used_datetime`) VALUES
(1, '高級救生圈', '2019-10-14 17:03:58', '2019-10-18 22:58:02'),
(2, '象之笛', '2019-10-14 17:05:43', '2019-10-18 23:30:14'),
(3, '無敵風火輪', '2019-10-14 17:05:55', '2019-10-19 08:09:08'),
(4, '轉蛋徽章', '2019-10-14 17:09:19', NULL),
(5, '乾坤圈', '2019-10-14 17:10:25', NULL),
(6, '混天綾', '2019-10-14 17:10:42', NULL),
(7, '火劍槍', '2019-10-14 17:11:07', '2019-10-19 08:24:26'),
(8, '金箍棒', '2019-10-14 17:11:24', NULL),
(9, '九齒釘耙', '2019-10-14 17:11:37', NULL),
(10, '超級棒棒糖 一箱', '2019-10-14 17:12:04', NULL),
(11, '旺旺碎冰冰 一箱', '2019-10-14 17:12:15', NULL),
(12, '王母蟠桃 一顆', '2019-10-14 17:12:49', '2019-10-19 08:09:05'),
(13, '白龍馬 一匹', '2019-10-14 17:13:03', '2019-10-19 08:09:04'),
(14, '瑪莎拉蒂 [限量版]', '2019-10-14 17:13:59', '2019-10-19 08:22:06'),
(15, '小籠包 免費吃10天', '2019-10-14 17:14:24', '2019-10-19 08:28:39'),
(16, '螺螄粉 免費吃10天', '2019-10-14 17:15:00', NULL),
(17, 'KFC全家桶', '2019-10-14 17:15:48', NULL),
(18, '藍月亮洗衣液 一包', '2019-10-14 17:16:15', NULL),
(19, '港澳臺七日遊', '2019-10-14 17:17:43', '2019-10-19 07:48:08'),
(20, '哇哈哈AD鈣 一件', '2019-10-14 17:18:17', NULL),
(21, '聯想筆記本 一台', '2019-10-14 17:19:08', NULL),
(22, 'SHARP高清顯示屏', '2019-10-14 17:19:51', NULL),
(23, 'iPhone 11 一部', '2019-10-14 17:21:22', '2019-10-19 08:09:05'),
(24, 'Redmi K20 Pro 一部', '2019-10-14 17:22:04', '2019-10-19 08:21:39'),
(25, '現金 ￥1000', '2019-10-14 17:24:54', '2019-10-19 08:30:01'),
(26, '造型商城代金券 $2000', '2019-10-14 17:25:28', '2019-10-19 08:28:04'),
(27, '金庸全集 [精裝版]', '2019-10-14 17:26:02', NULL),
(28, '四大名著 [精裝版]', '2019-10-14 17:26:40', '2019-10-19 08:21:12'),
(29, '機械鍵盤 一把', '2019-10-14 17:27:20', NULL),
(30, '固態硬盤+內存條', '2019-10-14 17:29:49', '2019-10-18 22:58:14'),
(34, 'lruihao.cn', '2019-10-16 10:11:52', NULL);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
