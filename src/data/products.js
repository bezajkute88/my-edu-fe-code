// Dữ liệu giả về các khóa học
// Import ảnh khóa học
import reactCourse from '../assets/courses/react-complete.jpg';
import nodeCourse from '../assets/courses/node-complete.jpg';
import pythonCourse from '../assets/courses/python-bootcamp.jpg';
import javascriptCourse from '../assets/courses/javascript-complete.jpg';
import angularCourse from '../assets/courses/angular-complete.jpg';

// Import ảnh giảng viên
import maximilian from '../assets/instructors/maximilian.jpg';
import andrei from '../assets/instructors/andrei.jpg';
import angela from '../assets/instructors/angela.jpg';
import jonas from '../assets/instructors/jonas.jpg';
import colt from '../assets/instructors/colt.jpg';

export const products = [
  {
    id: 1,
    name: 'Khóa học ReactJS từ cơ bản đến nâng cao',
    price: 799000,
    description: 'Học ReactJS toàn tập qua các dự án thực tế. Phù hợp cho người mới bắt đầu.',
    image: reactCourse,
    instructorImage: maximilian,
    category: 'Lập trình',
    instructor: 'Maximilian Schwarzmüller',
    rating: 4.8,
    students: 1234,
    duration: '20 giờ',
    level: 'Cơ bản đến nâng cao',
    updatedAt: '2024-03-15',
    curriculum: [
      'Giới thiệu về ReactJS',
      'JSX và Components',
      'State và Props',
      'React Hooks',
      'Redux và State Management',
      'Performance Optimization',
    ]
  },
  {
    id: 2,
    name: 'Luyện thi TOEIC 750+ trong 3 tháng',
    price: 1200000,
    description: 'Lộ trình chi tiết giúp bạn đạt mục tiêu TOEIC 750+ với các mẹo và bài tập độc quyền.',
    image: angularCourse, // Tạm dùng ảnh khác vì chưa có ảnh TOEIC
    instructorImage: angela,
    category: 'Tiếng Anh',
    instructor: 'Angela Yu',
    rating: 4.9,
    students: 2156,
    duration: '40 giờ',
    level: 'Trung cấp đến cao cấp',
    updatedAt: '2024-03-10',
    curriculum: [
      'Chiến lược làm bài thi',
      'Ngữ pháp TOEIC',
      'Từ vựng theo chủ đề',
      'Luyện nghe Part 1-4',
      'Luyện đọc Part 5-7',
      'Đề thi thử',
    ]
  },
  {
    id: 3,
    name: 'Node.js & Express - Xây dựng REST API',
    price: 850000,
    description: 'Tự tay xây dựng backend cho ứng dụng web với Node.js và Express.',
    image: nodeCourse,
    instructorImage: andrei,
    category: 'Lập trình',
    instructor: 'Andrei Neagoie',
    rating: 4.7,
    students: 987,
    duration: '25 giờ',
    level: 'Trung cấp',
    updatedAt: '2024-03-12',
    curriculum: [
      'Cơ bản về Node.js',
      'Express Framework',
      'RESTful API Design',
      'MongoDB Integration',
      'Authentication & Authorization',
      'Error Handling',
    ]
  },
  {
    id: 4,
    name: 'Tiếng Anh giao tiếp cho người đi làm',
    price: 450000,
    description: 'Cải thiện kỹ năng nghe nói, tự tin giao tiếp trong môi trường công sở.',
    image: javascriptCourse, // Tạm dùng ảnh khác vì chưa có ảnh English
    instructorImage: jonas,
    category: 'Tiếng Anh',
    instructor: 'Jonas Schmedtmann',
    rating: 4.6,
    students: 1567,
    duration: '15 giờ',
    level: 'Sơ cấp đến trung cấp',
    updatedAt: '2024-03-08',
    curriculum: [
      'Giao tiếp văn phòng',
      'Email Business',
      'Họp và thuyết trình',
      'Small talk',
      'Đàm phán',
      'Phỏng vấn',
    ]
  },
  {
    id: 5,
    name: 'Thiết kế UI/UX cho người mới bắt đầu',
    price: 600000,
    description: 'Nắm vững các nguyên tắc thiết kế và sử dụng Figma để tạo ra giao diện đẹp mắt.',
    image: pythonCourse, // Tạm dùng ảnh khác vì chưa có ảnh UI/UX
    instructorImage: colt,
    category: 'Thiết kế',
    instructor: 'Colt Steele',
    rating: 4.9,
    students: 2345,
    duration: '30 giờ',
    level: 'Cơ bản',
    updatedAt: '2024-03-14',
    curriculum: [
      'Nguyên tắc thiết kế',
      'Color Theory',
      'Typography',
      'Layout Design',
      'Figma Tools',
      'Prototyping',
    ]
  },
  {
    id: 6,
    name: 'Quản lý dự án với Agile và Scrum',
    price: 950000,
    description: 'Học cách quản lý dự án hiệu quả theo phương pháp Agile và Scrum.',
    image: angularCourse, // Tạm dùng ảnh khác vì chưa có ảnh Agile
    instructorImage: maximilian,
    category: 'Quản lý',
    instructor: 'Maximilian Schwarzmüller',
    rating: 4.8,
    students: 1789,
    duration: '18 giờ',
    level: 'Trung cấp',
    updatedAt: '2024-03-11',
    curriculum: [
      'Agile Principles',
      'Scrum Framework',
      'Sprint Planning',
      'Daily Standup',
      'Retrospectives',
      'Project Tracking',
    ]
  },
]; 