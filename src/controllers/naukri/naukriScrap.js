const puppeteer = require("puppeteer");
require("dotenv").config()

module.exports = async function (req, res) {
  var title = req.query.keyword;
  var location = req.query.location;

  //change spaces to - for applying it to the naukri link
  title = title.replace(" ", "-");
  location = location.replace(" ", "-");

  var final_jobs = [];

  //lauch a chromium browser
  const puppeteerConfig = {
    headless: true,
    args: ["--no-sandbox",'--disable-setuid-sandbox',"--single-process","--no-zygote  "],
    executablePath:  process.env.PUPPETEER_EXECUTABLE_PATH 
    //executablePath:"/opt/homebrew/bin/chromium"
  };
  const browser = await puppeteer.launch(puppeteerConfig);

  try {
    const page = await browser.newPage();
    await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36");
    await page.goto(`https://www.naukri.com/${title}-jobs-in-${location}`, {
      waitUntil: "networkidle0",
      timeout: 0
    });
    //const html = await page.evaluate(()=> document.documentElement.outerHTML);
  

    //get links of the post displayed
    let job_links = await page.evaluate(async () => {
      let atts = document.getElementsByClassName("title ellipsis");
      var links = [];
      for (let i = 0; i < atts.length; i++) {
        links.push(atts[i].href);
      }

      return links;
    });

   

    // try {
    //   await page.goto(job_links[0]);
    //   let title = await page.evaluate( ()=>{ 
    //    return   document.querySelector("#root > main > div.jd-container > div.leftSec > section.job-desc > div.dang-inner-html").innerText
    // });
    //   console.log(job_links[0],title)
    // } catch (error) {
      
    // }

   // navigating through all the job_links and appending the job details to jobs map(47-120)
    for (let i = 0; i < job_links.length; i++) {
      //final map to send job details
      // let jobs = {
      //   title: null,
      //   company: null,
      //   experience: null,
      //   location: null,
      //   jd: null,
      //   Role: null,
      //   roletype: null,
      //   role_category: null,
      //   Education: null,
      //   apply_link: null,
      //   via: 'Naukri',
      // }
      var jobs = {};
      if(job_links[i]!==null){

      try {
        await page.goto(job_links[i]);

        try {
          let title = await page.evaluate(() => {
            return document.querySelector(".jd-header-title")
              .innerText;
          });
          jobs.title = title.trim();
        } catch (error) {
          // jobs.job_title = 'error'
        }
        try {
          let c_name = await page.evaluate(() => {
            return document.querySelector(
              "#root > main > div.jd-container > div.leftSec > section.jd-header > div.top > div.jd-top-head > div.jd-header-comp-name > a"
            ).innerText;
          });
          jobs.company = c_name.trim();
        } catch (error) {
          // jobs.Company_Name = 'error'
        }
        try {
          let c_logo = await page.evaluate(() => {
            return document.querySelector(
              "#root > main > div.jd-container > div.leftSec > section.jd-header > div.top  > a > img"
            ).getAttribute('src');
          });
          jobs.company_logo = c_logo.trim();
        } catch (error) {
          // jobs.Company_Name = 'error'
        }

        // try {
        //   let experience = await page.evaluate(() => {
        //     return document.querySelector("#root > main > div.jd-container > div.leftSec > section.jd-header > div.top > div.left > div.exp > span").innerText;
        //   });
        //   jobs.experience = experience.trim();
        // } catch (error) {
        //   // jobs.Experience = 'error'
        // }

        try {
          let location = await page.evaluate(() => {
            return document.querySelector("#root > main > div.jd-container > div.leftSec > section.jd-header > div.top > div.left > div.loc > span > a")
              .innerText;
          });
          jobs.location = location.trim();
        } catch (error) {
          // jobs.location = 'error'
        }
        try {
          let JD = await page.evaluate(() => {
            return document.querySelector("#root > main > div.jd-container > div.leftSec > section.job-desc > div.dang-inner-html").innerText;
          });
          jobs.jd = JD.trim();
        } catch (error) {
          // jobs.Job_description = 'error'
        }

        // try {
        //   let role = await page.evaluate(() => {
        //     return document.querySelector("#root > main > div.jd-container > div.leftSec > section.job-desc > div.other-details > div:nth-child(1) > span > a")
        //       .innerText;
        //   });
        //   jobs.Role = role.trim();
        // } catch (error) {
        //   // jobs.Role = 'error'
        // }

        // try {
        //   let ET = await page.evaluate(() => {
        //     return document.querySelector(
        //       "#root > main > div.jd-container > div.leftSec > section.job-desc > div.other-details > div:nth-child(4) > span > span"
        //     ).innerText;
        //   });
        //   jobs.roletype = ET.trim();
        // } catch (error) {
        //   // jobs.Employment_Type = 'error'
        // }

        // try {
        //   let role_cat = await page.evaluate(() => {
        //     return document.querySelector(
        //       "#root > main > div.jd-container > div.leftSec > section.job-desc > div.other-details > div:nth-child(5) > span > span"
        //     ).innerText;
        //   });
        //   jobs.role_category = role_cat.trim();
        // } catch (error) {
        //   // jobs.role_category = 'error'
        // }
        // try {
        //   let education = await page.evaluate(() => {
        //     return document.querySelector("#root > main > div.jd-container > div.leftSec > section.job-desc > div.education").innerText;
        //   });
        //   jobs.Education = education.trim();
        // } catch (error) {
        //   // jobs.Education = 'error'
        // }

        try {
          jobs.link = job_links[i];
        } catch (error) {
          // jobs.apply_link = 'error'
        }
        jobs.via = "Naukri";
        try {
          if (jobs.title) {
            final_jobs.push(jobs);
          }
        } catch (error) {}

      } catch (error) {
        console.log(error);
      }
    }
    }
    //closing the chromium brower after completion
    browser.close();
    res.status(200).send({ length : final_jobs.length  , data: final_jobs });
  } catch (error) {
    console.error(error);
    browser.close();
    res.status(400).send({ status: false, message: error.message });
  }
};
