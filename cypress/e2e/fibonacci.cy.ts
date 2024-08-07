import { 
  allCirclesSelector, 
  defaultCircleSelector, 
  changingCircleSelector, 
  modifiedCircleSelector 
} from "./constants";
import { Delay } from "../../src/utils/constants";



describe(
  "Fibonacci sequence page tests", () => {
    
    beforeEach(
      () => {
        cy.visit("fibonacci");
      }
    );
    
    it(
      "enables and disables button based on input content and sequence state", () => {
        
        // check states with empty input
        cy.getByTestId("input").should("be.empty").as("input");
        cy.getByTestId("calculate-button").should("be.disabled").as("calculateButton");
        
        // check states with index === -1
        cy.get("@input").type("-1");
        cy.get("@input").should("have.value", "-1");
        cy.get("@calculateButton").should("be.disabled");
        
        // check states with index === 0
        cy.get("@input").clear();
        cy.get("@input").should("be.empty");
        cy.get("@input").type("0");
        cy.get("@input").should("have.value", "0");
        cy.get("@calculateButton").should("be.enabled");
        cy.getByTestId("form").submit();
        
        // check initial changes
        cy.get("@input").should("be.empty");
        cy.get("@calculateButton").should("be.disabled");
        
        cy.wait(Delay.Medium);
        
        // check delayed changes
        cy.get("@input").should("be.empty");
        cy.get("@calculateButton").should("be.disabled");
        
        // check states with various input values
        cy.get("@input").type("5");
        cy.get("@input").should("have.value", "5");
        cy.get("@calculateButton").should("be.enabled");      
        
        cy.get("@input").clear();
        cy.get("@input").should("be.empty");        
        cy.get("@input").type("19");
        cy.get("@input").should("have.value", "19");
        cy.get("@calculateButton").should("be.enabled");    
        
        cy.get("@input").clear();
        cy.get("@input").should("be.empty");        
        cy.get("@input").type("20");
        cy.get("@input").should("have.value", "20");
        cy.get("@calculateButton").should("be.disabled");        
      }
    );
    
    it(
      "calculates correct sequence for index === 1", () => {
        
        // calculate
        cy.getByTestId("input").type("1");
        cy.getByTestId("form").submit();
        
        // check changes
        cy.get(allCirclesSelector).first().as("element1");
        cy.get("@element1").contains("0");
        cy.get("@element1").children(defaultCircleSelector);
        cy.wait(Delay.Medium);
        
        // check changes
        cy.get(allCirclesSelector).eq(1).as("element2");
        cy.get("@element2").contains("1");
        cy.get("@element2").children(defaultCircleSelector);
        cy.wait(Delay.Medium);
        
        // check changes
        cy.get("@element1").contains("0");
        cy.get("@element1").children(defaultCircleSelector);
        cy.get("@element2").contains("1");
        cy.get("@element2").children(defaultCircleSelector);
      }
    );
    
    it(
      "calculates correct sequence for index === 2", () => {
        
        // calculate
        cy.getByTestId("input").type("2");
        cy.getByTestId("form").submit();
        
        // check changes
        cy.get(allCirclesSelector).first().as("element1");
        cy.get("@element1").contains("0");
        cy.get("@element1").children(defaultCircleSelector);
        cy.wait(Delay.Medium);
        
        // check changes
        cy.get(allCirclesSelector).eq(1).as("element2");
        cy.get("@element2").contains("1");
        cy.get("@element2").children(defaultCircleSelector);
        cy.wait(Delay.Medium);
        
        // check changes
        cy.get("@element1").contains("0");
        cy.get("@element1").children(changingCircleSelector);
        cy.get("@element2").contains("1");
        cy.get("@element2").children(changingCircleSelector);
        cy.wait(Delay.Medium);
        
        // check changes
        cy.get(allCirclesSelector).eq(2).as("element3");
        cy.get("@element1").contains("0");
        cy.get("@element1").children(defaultCircleSelector);
        cy.get("@element2").contains("1");
        cy.get("@element2").children(defaultCircleSelector);
        cy.get("@element3").contains("1");
        cy.get("@element3").children(modifiedCircleSelector);
        cy.wait(Delay.Medium);        
        
        // check changes
        cy.get("@element1").contains("0");
        cy.get("@element1").children(defaultCircleSelector);
        cy.get("@element2").contains("1");
        cy.get("@element2").children(defaultCircleSelector);
        cy.get("@element3").contains("1");
        cy.get("@element3").children(defaultCircleSelector);        
      }
    );
    
    it(
      "calculates correct sequence for index === 5", () => {
        
        // calculate
        cy.getByTestId("input").type("5");
        cy.getByTestId("form").submit();
        
        // check changes
        cy.get(allCirclesSelector).first().as("element1");
        cy.get("@element1").contains("0");
        cy.get("@element1").children(defaultCircleSelector);
        cy.wait(Delay.Medium);
        
        // check changes
        cy.get(allCirclesSelector).eq(1).as("element2");
        cy.get("@element2").contains("1");
        cy.get("@element2").children(defaultCircleSelector);
        cy.wait(Delay.Medium);
        
        // check changes
        cy.get("@element1").contains("0");
        cy.get("@element1").children(changingCircleSelector);
        cy.get("@element2").contains("1");
        cy.get("@element2").children(changingCircleSelector);
        cy.wait(Delay.Medium);
        
        // check changes
        cy.get(allCirclesSelector).eq(2).as("element3");
        cy.get("@element1").contains("0");
        cy.get("@element1").children(defaultCircleSelector);
        cy.get("@element2").contains("1");
        cy.get("@element2").children(defaultCircleSelector);
        cy.get("@element3").contains("1");
        cy.get("@element3").children(modifiedCircleSelector);
        cy.wait(Delay.Medium);        
        
        // check changes
        cy.get("@element1").contains("0");
        cy.get("@element1").children(defaultCircleSelector);
        cy.get("@element2").contains("1");
        cy.get("@element2").children(changingCircleSelector);
        cy.get("@element3").contains("1");
        cy.get("@element3").children(changingCircleSelector);
        cy.wait(Delay.Medium);        
        
        // check changes
        cy.get(allCirclesSelector).eq(3).as("element4");
        cy.get("@element1").contains("0");
        cy.get("@element1").children(defaultCircleSelector);
        cy.get("@element2").contains("1");
        cy.get("@element2").children(defaultCircleSelector);
        cy.get("@element3").contains("1");
        cy.get("@element3").children(defaultCircleSelector);
        cy.get("@element4").contains("2");
        cy.get("@element4").children(modifiedCircleSelector);
        cy.wait(Delay.Medium);                
        
        // check changes
        cy.get("@element1").contains("0");
        cy.get("@element1").children(defaultCircleSelector);
        cy.get("@element2").contains("1");
        cy.get("@element2").children(defaultCircleSelector);
        cy.get("@element3").contains("1");
        cy.get("@element3").children(changingCircleSelector);
        cy.get("@element4").contains("2");
        cy.get("@element4").children(changingCircleSelector);
        cy.wait(Delay.Medium);             
        
        // check changes  
        cy.get(allCirclesSelector).eq(4).as("element5");
        cy.get("@element1").contains("0");
        cy.get("@element1").children(defaultCircleSelector);
        cy.get("@element2").contains("1");
        cy.get("@element2").children(defaultCircleSelector);
        cy.get("@element3").contains("1");
        cy.get("@element3").children(defaultCircleSelector);
        cy.get("@element4").contains("2");
        cy.get("@element4").children(defaultCircleSelector);
        cy.get("@element5").contains("3");
        cy.get("@element5").children(modifiedCircleSelector);
        cy.wait(Delay.Medium);                  
        
        // check changes  
        cy.get("@element1").contains("0");
        cy.get("@element1").children(defaultCircleSelector);
        cy.get("@element2").contains("1");
        cy.get("@element2").children(defaultCircleSelector);
        cy.get("@element3").contains("1");
        cy.get("@element3").children(defaultCircleSelector);
        cy.get("@element4").contains("2");
        cy.get("@element4").children(changingCircleSelector);
        cy.get("@element5").contains("3");
        cy.get("@element5").children(changingCircleSelector);
        cy.wait(Delay.Medium);          
        
        // check changes  
        cy.get(allCirclesSelector).eq(5).as("element6");
        cy.get("@element1").contains("0");
        cy.get("@element1").children(defaultCircleSelector);
        cy.get("@element2").contains("1");
        cy.get("@element2").children(defaultCircleSelector);
        cy.get("@element3").contains("1");
        cy.get("@element3").children(defaultCircleSelector);
        cy.get("@element4").contains("2");
        cy.get("@element4").children(defaultCircleSelector);
        cy.get("@element5").contains("3");
        cy.get("@element5").children(defaultCircleSelector);
        cy.get("@element6").contains("5");
        cy.get("@element6").children(modifiedCircleSelector);
        cy.wait(Delay.Medium);     
        
        // check changes  
        cy.get("@element1").contains("0");
        cy.get("@element2").contains("1");
        cy.get("@element3").contains("1");
        cy.get("@element4").contains("2");
        cy.get("@element5").contains("3");
        cy.get("@element6").contains("5");
        cy.get(allCirclesSelector).should("have.length", 6).each(
          ($el) => {
            cy.wrap($el).children(defaultCircleSelector);               
          }
        );      
      }
    );    
  }
);
