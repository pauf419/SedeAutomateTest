const puppeteer = require('puppeteer-extra') 
const pluginStealth = require('puppeteer-extra-plugin-stealth') 
const fs = require('fs')
const axios = require("axios")

const uas = [
    "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:122.0) Gecko/20100101 Firefox/122.0",
    "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36 Vivaldi/6.5.3206.63",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36 Vivaldi/6.5.3206.63",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36 Edg/121.0.2277.112",
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
    "Mozilla/5.0 (iPhone; CPU iPhone OS 17_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/122.0.6261.62 Mobile/15E148 Safari/604.1",
    "Mozilla/5.0 (iPad; CPU OS 17_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/122.0.6261.62 Mobile/15E148 Safari/604.1",
    "Mozilla/5.0 (iPod; CPU iPhone OS 17_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/122.0.6261.62 Mobile/15E148 Safari/604.1",
    "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.6261.64 Mobile Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.6261.64 Mobile Safari/537.36"
]
 
const ethDebug = (eth) => {  
    console.log(`
        \nEth${eth} - P -
    `) 
}   

const randomTimeout = () => {  
  return Math.floor(Math.random() * 300) + 1000 
} 
    
const PROXY_INDEX = 29
 
const getProxySysPth = (proxy, loc = false) => {
  return `${__dirname}/pdata/${proxy.replace(":", "_")}.${loc ? "ls" : "cookie"}` 
}


const getProxy = async () => {  
    return await new Promise(async (resolve, reject) =>  
    {   
        fs.readFile(__dirname + "/webshare.txt", 'utf8', (e, d) => {
            return resolve(d.replaceAll("\r", "").split("\n")[PROXY_INDEX])     
        })   
    })      
}


const getProxyConfig = async (sysPthCookie, sysPthLS) => {
  return await new Promise(async (root) => {
    const cookie = await new Promise(async (resolve, _) =>  
    {   
        fs.readFile(sysPthCookie, 'utf8', (e, d) => {
            if(e) return resolve([])
            const spl = d.split("|Mo") 
            const p = JSON.parse(spl[0])    

            return resolve({
              cookies: p, 
              ua: spl[1]
            })     
        })     
    })
    const ls = await new Promise(async (resolve, _) => {
      fs.readFile(sysPthLS, 'utf8', (e, d) => {
        if(e) return resolve([])
        const p = JSON.parse(d)   
        return resolve(p)     
      }) 
    })
    return root({
      ...cookie, 
      ls
    })
  }) 
}

const setupProxy = async (proxy) => {
  const sysPthCookie = getProxySysPth(proxy)
  const sysPthLS = getProxySysPth(proxy, true)
  if(fs.existsSync(sysPthCookie)) return {
    ...await getProxyConfig(sysPthCookie, sysPthLS)
  }  

  const ua = uas[Math.floor(Math.random()*uas.length)]

  fs.writeFileSync(sysPthCookie, `[]|${ua}`) 
  fs.writeFileSync(sysPthLS, "[]")
  return {  
    cookies: [], 
    ua,
    ls: []
  }  
}

const writeProxyCookies = (cks, proxy) => {
  const sysPth = getProxySysPth(proxy) 
  const {ua} = getProxyConfig(sysPth) 
  fs.writeFileSync(sysPth, JSON.stringify(cks)+"|"+ua) 
}

const writeProxyLS = (ls, proxy) => {
  const sysPthLS = getProxySysPth(proxy, true)
  fs.writeFileSync(sysPthLS, JSON.stringify(ls))
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}


const solveCaptcha = async (fname) => {

  const filePath = `${__dirname}/${fname}`;

  const formData = new FormData();
  
  const fileData = fs.readFileSync(filePath);
  
  const blob = new Blob([fileData]); 
  
  formData.append('file', blob, '${fname}');
  
  formData.append('key', '8hqpcfc2nbrg7ywzltgt3knvqrdzwbdk');
  formData.append('method', 'post'); 
   
  const captchaId = await axios.post("http://azcaptcha.com/in.php", formData)
  const id = captchaId.data.split("|")[1]
  await sleep(4000)
  const solve = await axios.get(`http://azcaptcha.com/res.php?key=8hqpcfc2nbrg7ywzltgt3knvqrdzwbdk&action=get&id=${id}`)
  return solve.data.split("|")[1]

}

const req_data = { 
  locality: "/icpplus/citar?p=2&locale=es", 
  office: "2",
  policia_tramites: '4112', 
  nie: "Z0563935A", 
  pnm: "653615024", 
  email: "lina.keratina@gmail.com",
  citado: "KATERINA SOLODA"  
}      

const BookAppointment = async () => { 
  puppeteer.use(pluginStealth())      

  const proxy = await getProxy()

  const {cookies, userAgent} = await setupProxy(proxy)  
      
  const browser = await puppeteer.launch({     
      slowMo: 10, 
      headless: false, 
      args: [  
          `--start-maximized`, 
          `--proxy-server=${proxy}`,   
      ], 
  })  
  const page = await browser.newPage();  

  await page.setCookie(...cookies)   

  await page.setExtraHTTPHeaders({
    "User-Agent": userAgent, 
  })  

  await page.goto(`https://icp.administracionelectronica.gob.es/icpplus/index.html`, { waitUntil: 'networkidle2' })

  await page.waitForSelector("#form")    
  await page.waitForTimeout(2200) 
  await page.select("#form", "/icpplus/citar?p=2&locale=es")  
  await page.waitForTimeout(2200)  
  await Promise.all([page.click("#btnAceptar"), page.waitForNavigation({waitUntil:'networkidle2'})])

  await page.waitForSelector("#sede")
  await page.waitForTimeout(2200) 
  await Promise.all([page.select("#sede", "2"), page.waitForNavigation({waitUntil:'networkidle2'})])

  await page.waitForSelector(".mf-input__l")
  await page.waitForSelector("#btnAceptar")
  await page.select(".mf-input__l", "4112")
  await page.waitForTimeout(2200)
  await Promise.all([page.click("#btnAceptar"), page.waitForNavigation({waitUntil:'networkidle2'})])

  await page.waitForSelector("#btnEntrar")
  await page.waitForTimeout(2200)  
  await page.click("#btnEntrar")
  await page.waitForSelector("#txtIdCitado")
  await page.waitForSelector("#txtDesCitado")
  await page.waitForSelector("#btnEnviar")
  await page.type("#txtIdCitado", "Z0563935A") 
  await page.waitForTimeout(2200) 
  await page.type("#txtDesCitado", "KATERINA SOLODA" )
  await page.waitForTimeout(2200)
  await Promise.all([page.click("#btnEnviar"), page.waitForNavigation({waitUntil:'networkidle2'})])

  await page.waitForSelector("#btnEnviar")
  await page.waitForTimeout(2200) 

  await Promise.all([page.click("#btnEnviar"), page.waitForNavigation({waitUntil:'networkidle2'})])

  await page.waitForSelector("#txtTelefonoCitado")
  await page.waitForTimeout(2200)  
  await page.type("#txtTelefonoCitado", "653615024")
  await page.type("#emailUNO", "lina.keratina@gmail.com")
  await page.type("#emailDOS", "lina.keratina@gmail.com") 
  await page.waitForTimeout(2200)  
  await Promise.all([page.click("#btnSiguiente"), page.waitForNavigation({waitUntil:'domcontentloaded'})])  

  await page.waitForSelector("#btnSiguiente")
  await page.waitForSelector("#cita1")
  

  try {
    const element = await page.waitForSelector(".img-thumbnail", {timeout: 5000}) 
    await page.waitForTimeout(randomTimeout()) 
    await element.screenshot({ 
      path: `post_image_1.jpg`  
    })
    const key = await solveCaptcha(`post_image_1.jpg`)
    await page.type("#captcha", key)
  } catch(e) {
    console.log(e)
  }

  await page.click("#cita1")
  await page.click("#btnSiguiente")
  await page.waitForTimeout(2000)
  await page.waitForSelector(".btn")
  await page.click(".btn")
  await page.waitForTimeout(10000)
  await Promise.all([page.goto("https://icp.administracionelectronica.gob.es/icpplus/index.html"), page.waitForNavigation({waitUntil:'domcontentloaded'})]) 
  
  
  const pageCookies = await page.cookies()  


  writeProxyCookies(pageCookies, proxy)
}
