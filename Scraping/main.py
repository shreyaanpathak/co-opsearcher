from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.action_chains import ActionChains
import time
from bs4 import BeautifulSoup
from abc import ABC, abstractmethod

class Job(ABC):
    def __init__(self):
        pass

class JobIndeed(Job):
    def __init__(self):
        pass

class Query(ABC):

    def __init__(self, driver: webdriver) -> None:
        self.driver = driver

    @abstractmethod
    def __str__() -> str:
        pass
    
    @abstractmethod
    def get_jobinfo() -> Job:
        pass

class QueryIndeed(Query):

    def __init__(self, driver: webdriver, job: str, location: str) -> None:
        super().__init__(driver=driver)
        self.job = job
        self.location = location
    
    def get_jobinfo() -> JobIndeed:
        pass

#create webdriver object
driver = webdriver.Chrome()

#navigate to google.com
driver.get("https://www.indeed.com/")

name = input("job u looking for: ")
livewhere = input("where ur dumbass live?: ")

def indeedtest():
    time.sleep(1)
    job = driver.find_element(By.ID, "text-input-what")
    loc = driver.find_element(By.ID, "text-input-where")
    job.send_keys(name)
    clear = (By.CSS_SELECTOR, "button[aria-label='Clear location input']")
    hover = ActionChains(driver).move_to_element(loc)
    hover.perform()
    wait = WebDriverWait(driver, 10)
    button = wait.until(EC.visibility_of_element_located(clear))
    button.click()
    time.sleep(1)
    loc.send_keys(livewhere)
    job.send_keys(Keys.RETURN)
    time.sleep(1)
    html_page_source = driver.page_source
    parse_soup = BeautifulSoup(html_page_source, 'html.parser')
    job_elements = parse_soup.find_all(class_='fastviewjob jobsearch-ViewJobLayout--embedded css-1lo7kga eu4oa1w0 hydrated')
    for element in job_elements:
        print(element.get_text())
    

  
    # WORK IN PROGRESS
    #hover_2 = ActionChains(driver).move_to_element(driver.find_element(By.CLASS_NAME, 'jcs-JobTitle css-jspxzf eu4oa1w0'))
    #hover_2.perform()
    # Wait until the element is clickable
    #wait = WebDriverWait(driver, 10)
    #link = wait.until(EC.element_to_be_clickable((By.CLASS_NAME, 'jcs-JobTitle css-jspxzf eu4oa1w0')))
    # Change the link's target attribute to open in a new tab
    #driver.execute_script("arguments[0].target='_blank';", link)
    #  Click the link, which now opens in a new tab
    #link.click()    


indeedtest()
