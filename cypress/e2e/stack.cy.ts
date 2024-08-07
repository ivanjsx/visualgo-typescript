import { 
  allCirclesSelector, 
  defaultCircleSelector, 
  changingCircleSelector, 
  modifiedCircleSelector 
} from "./constants";
import { Delay } from "../../src/utils/constants";



describe(
  "Stack page tests", () => {
    
    beforeEach(
      () => {
        cy.visit("stack");
      }
    );
    
    it(
      "enables and disables buttons based on input content and stack state", () => {
        
        // check states with empty stack
        cy.getByTestId("input").should("be.empty").as("input");
        cy.getByTestId("push-button").should("be.disabled").as("pushButton");
        cy.getByTestId("pop-button").should("be.disabled").as("popButton");
        cy.getByTestId("clear-button").should("be.disabled").as("clearButton");
        
        // add element
        cy.get("@input").type("42");
        cy.get("@pushButton").should("be.enabled");
        cy.get("@popButton").should("be.disabled");
        cy.get("@clearButton").should("be.disabled");
        cy.getByTestId("form").submit();
        
        cy.wait(Delay.Medium);
        
        // check states with loaded stack
        cy.get("@input").should("be.empty");
        cy.get("@pushButton").should("be.disabled");
        cy.get("@popButton").should("be.enabled");
        cy.get("@clearButton").should("be.enabled");        
        
        // check states with various input values
        cy.get("@input").type(" ");
        cy.get("@pushButton").should("be.enabled");
        cy.get("@input").clear();
        cy.get("@input").should("be.empty");
        cy.get("@pushButton").should("be.disabled");
        cy.get("@input").type("12345");
        cy.get("@input").should("have.value", "1234");
        cy.get("@pushButton").should("be.enabled");     
        
        // check empty stack
        cy.get("@popButton").click();
        cy.get("@pushButton").should("be.disabled");
        cy.get("@popButton").should("be.disabled");
        cy.get("@clearButton").should("be.disabled");
      }
    ); 
    
    it(
      "should add new elements correctly", () => {
        
        // add first element
        cy.getByTestId("input").type("11").as("input");
        cy.getByTestId("push-button").click().as("pushButton");
        cy.get(allCirclesSelector).first().as("element1");
        
        // check initial change
        cy.get("@element1").contains("11");
        cy.get("@element1").contains("top");
        cy.get("@element1").children(modifiedCircleSelector);
        
        cy.wait(Delay.Medium);
        
        // check delayed change
        cy.get("@element1").children(defaultCircleSelector);
        
        // add second element
        cy.get("@input").type("22");
        cy.get("@pushButton").click();
        cy.get(allCirclesSelector).eq(1).as("element2");
        
        // check initial change
        cy.get("@element2").contains("22");
        cy.get("@element2").contains("top");    
        cy.get("@element2").children(modifiedCircleSelector);
        cy.get("@element1").should("not.contain", "top");
        
        cy.wait(Delay.Medium);
        
        // check delayed change
        cy.get("@element2").children(defaultCircleSelector);
        
        // add third element
        cy.get("@input").type("33");
        cy.get("@pushButton").click();
        cy.get(allCirclesSelector).eq(2).as("element3");
        
        // check initial change
        cy.get("@element3").contains("33");
        cy.get("@element3").contains("top");    
        cy.get("@element3").children(modifiedCircleSelector);
        cy.get("@element2").should("not.contain", "top");
        cy.get("@element1").should("not.contain", "top");
        
        cy.wait(Delay.Medium);
        
        // check delayed change
        cy.get("@element3").children(defaultCircleSelector);        
        
        // check whole stack
        cy.get(allCirclesSelector).should("have.length", 3).each(
          ($el, index) => {
            cy.wrap($el).children(defaultCircleSelector);
            if (index === 0) {
              cy.wrap($el).contains("11");
              cy.wrap($el).should("not.contain", "top");
            } else if (index === 1) {
              cy.wrap($el).contains("22");
              cy.wrap($el).should("not.contain", "top");
            } else {
              cy.wrap($el).contains("33");
              cy.wrap($el).contains("top");    
            };
          }
        );
      }
    );
    
    it(
      "should remove existing elements correctly", () => {
        
        // add elements to remove them later
        cy.getByTestId("input").type("12").as("input");
        cy.getByTestId("push-button").click().as("pushButton");
        cy.wait(Delay.Medium);
        cy.get("@input").type("34");
        cy.get("@pushButton").click();
        cy.wait(Delay.Medium);
        cy.get("@input").type("56");
        cy.get("@pushButton").click();
        cy.wait(Delay.Medium);
        
        // remove first element
        cy.getByTestId("pop-button").click().as("popButton");
        cy.get(allCirclesSelector).first().as("element1");
        cy.get(allCirclesSelector).eq(1).as("element2");
        cy.get(allCirclesSelector).eq(2).as("element3");
        
        // check initial change
        cy.get("@element3").contains("56");
        cy.get("@element3").should("not.contain", "top");
        cy.get("@element3").children(changingCircleSelector);
        
        cy.wait(Delay.Medium);
        
        // check delayed change
        cy.get("@element3").should("not.exist");
        cy.get("@element2").contains("top");
        
        // remove second element
        cy.get("@popButton").click();
        
        // check initial change
        cy.get("@element2").contains("34");
        cy.get("@element2").should("not.contain", "top");
        cy.get("@element2").children(changingCircleSelector);
        
        cy.wait(Delay.Medium);
        
        // check delayed change
        cy.get("@element2").should("not.exist");
        cy.get("@element1").contains("top");
        
        // remove third element
        cy.get("@popButton").click();
        
        // check initial change
        cy.get("@element1").contains("12");
        cy.get("@element1").should("not.contain", "top");
        cy.get("@element1").children(changingCircleSelector);
        
        cy.wait(Delay.Medium);
        
        // check delayed change
        cy.get(allCirclesSelector).should("have.length", 0);
      }
    );    
    
    it(
      "should clear the queue correctly", () => {
          
          // add elements to clear them later
          for (let i = 0; i < 3; i++) {
            cy.getByTestId("input").type("333");
            cy.getByTestId("push-button").click();
            cy.wait(Delay.Medium);
          };
          
          // clear the stack
          cy.getByTestId("clear-button").click();
          
          // check whole stack
          cy.get(allCirclesSelector).should("have.length", 0);
      }
    );
  }
);
