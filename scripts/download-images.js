import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Danh sách URL ảnh từ Udemy
const images = {
  banner: [
    {
      id: 'banner',
      url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1920&q=80'
    }
  ],
  courses: [
    {
      id: 'react-complete',
      url: 'https://img-c.udemycdn.com/course/480x270/1362070_b9a1_2.jpg'
    },
    {
      id: 'node-complete',
      url: 'https://img-c.udemycdn.com/course/480x270/1879018_95b6_3.jpg'
    },
    {
      id: 'python-bootcamp',
      url: 'https://img-c.udemycdn.com/course/480x270/567828_67d0.jpg'
    },
    {
      id: 'javascript-complete',
      url: 'https://img-c.udemycdn.com/course/480x270/851712_fc61_6.jpg'
    },
    {
      id: 'angular-complete',
      url: 'https://img-c.udemycdn.com/course/480x270/756150_c033_2.jpg'
    }
  ],
  instructors: [
    {
      id: 'maximilian',
      url: 'https://img-c.udemycdn.com/user/200_H/13952972_e853.jpg'
    },
    {
      id: 'andrei',
      url: 'https://img-c.udemycdn.com/user/200_H/38516954_b11c.jpg'
    },
    {
      id: 'angela',
      url: 'https://img-c.udemycdn.com/user/200_H/31334738_a13c.jpg'
    },
    {
      id: 'jonas',
      url: 'https://img-c.udemycdn.com/user/200_H/7799204_2091_5.jpg'
    },
    {
      id: 'colt',
      url: 'https://img-c.udemycdn.com/user/200_H/4466306_6fd8_3.jpg'
    }
  ],
  previews: [
    {
      id: 'react-preview',
      url: 'https://img-c.udemycdn.com/course/480x270/1362070_b9a1_2.jpg'
    },
    {
      id: 'node-preview',
      url: 'https://img-c.udemycdn.com/course/480x270/1879018_95b6_3.jpg'
    },
    {
      id: 'python-preview',
      url: 'https://img-c.udemycdn.com/course/480x270/567828_67d0.jpg'
    }
  ]
};

// Tạo thư mục nếu chưa tồn tại
const createDirectory = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

// Tải ảnh từ URL
const downloadImage = (url, filepath) => {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(fs.createWriteStream(filepath))
          .on('error', reject)
          .once('close', () => resolve(filepath));
      } else {
        response.resume();
        reject(new Error(`Request Failed With a Status Code: ${response.statusCode}`));
      }
    });
  });
};

// Hàm chính để tải tất cả ảnh
async function downloadAllImages() {
  try {
    // Tạo thư mục assets nếu chưa có
    const baseDir = path.join(__dirname, '..', 'src', 'assets');
    createDirectory(baseDir);

    // Tạo các thư mục con
    Object.keys(images).forEach(dir => {
      createDirectory(path.join(baseDir, dir));
    });

    // Tải ảnh cho từng danh mục
    for (const [category, items] of Object.entries(images)) {
      console.log(`\nTải ảnh ${category}...`);
      
      for (const item of items) {
        const filepath = path.join(baseDir, category, `${item.id}.jpg`);
        
        try {
          await downloadImage(item.url, filepath);
          console.log(`✓ Đã tải: ${item.id}`);
        } catch (error) {
          console.error(`✗ Lỗi khi tải ${item.id}:`, error.message);
        }
      }
    }

    console.log('\n✓ Hoàn thành tải ảnh!');
  } catch (error) {
    console.error('\n✗ Lỗi:', error.message);
  }
}

// Chạy script
downloadAllImages(); 