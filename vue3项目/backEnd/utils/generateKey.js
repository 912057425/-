//生成公钥和私钥
const dotenv = require('dotenv')
const crypto = require('crypto')
const fs = require('fs')
const path = require('path')

// 配置密钥对生成参数
const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048, // 密钥长度（推荐 2048 或更高）
  publicKeyEncoding: {
    type: 'spki', // 公钥格式
    format: 'pem' // 输出格式为 PEM
  },
  privateKeyEncoding: {
    type: 'pkcs8', // 私钥格式
    format: 'pem' // 输出格式为 PEM
  }
})
// 获取当前文件所在目录的上一级目录
const parentDir = path.dirname(__dirname)

// 写入 .env 文件
const envFilePath = path.join(parentDir, '.env')
const envContent = `PUBLIC_KEY="${publicKey.replace(
  /\n/g,
  '\\n'
)}"\nPRIVATE_KEY="${privateKey.replace(/\n/g, '\\n')}"`
fs.appendFileSync(envFilePath, '\n' + envContent)

// 加载 .env 文件
dotenv.config()
