# import webdriver
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.action_chains import ActionChains
import time

# create webdriver object
driver = webdriver.Chrome()

#navigate to google.com
driver.get("https://www.indeed.com/")

def indeedtest():
    time.sleep(1)
    job = driver.find_element(By.ID, "text-input-what")
    loc = driver.find_element(By.ID, "text-input-where")
    job.send_keys("IT specialist")
    clear = (By.CSS_SELECTOR, "button[aria-label='Clear location input']")
    hover = ActionChains(driver).move_to_element(loc)
    hover.perform()
    wait = WebDriverWait(driver, 10)
    button = wait.until(EC.visibility_of_element_located(clear))
    button.click()
    time.sleep(1)
    loc.send_keys("Seattle, WA")
    job.send_keys(Keys.RETURN)
    time.sleep(10)


indeedtest()
