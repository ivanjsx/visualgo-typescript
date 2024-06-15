import { Delay } from "../../src/utils/constants";



describe(
  "Stack page tests", () => {
    
    beforeEach(
      () => {
        cy.visit("http://localhost:3000/stack");
      }
    );
    
    it(
      "enables and disables buttons based on input content and stack state", () => {
        
        // check states with empty stack
        cy.get("input").should("be.empty");
        cy.get('[data-testid="push-button"]').should("be.disabled");
        cy.get('[data-testid="pop-button"]').should("be.disabled");
        cy.get('[data-testid="clear-button"]').should("be.disabled");
        
        // add element
        cy.get("input").type("42");
        cy.get('[data-testid="push-button"]').should("be.enabled");
        cy.get('[data-testid="pop-button"]').should("be.disabled");
        cy.get('[data-testid="clear-button"]').should("be.disabled");
        cy.get("form").submit();
        
        cy.wait(Delay.Medium);
        
        // check states with loaded stack
        cy.get("input").should("be.empty");
        cy.get('[data-testid="push-button"]').should("be.disabled");
        cy.get('[data-testid="pop-button"]').should("be.enabled");
        cy.get('[data-testid="clear-button"]').should("be.enabled");        
        
        // check states with various input values
        cy.get("input").type(" ");
        cy.get('[data-testid="push-button"]').should("be.enabled");
        cy.get("input").clear();
        cy.get("input").should("be.empty");
        cy.get('[data-testid="push-button"]').should("be.disabled");
        cy.get("input").type("12345");
        cy.get("input").should("have.value", "1234");
        cy.get('[type="submit"]').should("be.enabled");     
        
        // check empty stack
        cy.get('[data-testid="pop-button"]').click();
        cy.get('[data-testid="push-button"]').should("be.disabled");
        cy.get('[data-testid="pop-button"]').should("be.disabled");
        cy.get('[data-testid="clear-button"]').should("be.disabled");
      }
    ); 
    
    it(
      "should add new elements correctly", () => {
        
        // add first element
        cy.get("input").type("11");
        cy.get('[data-testid="push-button"]').click();
        cy.get("[class*=circle_content]").first().as("element1");
        
        // check initial change
        cy.get("@element1").contains("11");
        cy.get("@element1").contains("top");
        cy.get("@element1").children("[class*=circle_modified]");
        
        cy.wait(Delay.Medium);
        
        // check delayed change
        cy.get("@element1").children("[class*=circle_default]");
        
        // add second element
        cy.get("input").type("22");
        cy.get('[data-testid="push-button"]').click();
        cy.get("[class*=circle_content]").eq(1).as("element2");
        
        // check initial change
        cy.get("@element2").contains("22");
        cy.get("@element2").contains("top");    
        cy.get("@element2").children("[class*=circle_modified]");
        cy.get("@element1").should("not.contain", "top");
        
        cy.wait(Delay.Medium);
        
        // check delayed change
        cy.get("@element2").children("[class*=circle_default]");
        
        // add third element
        cy.get("input").type("33");
        cy.get('[data-testid="push-button"]').click();
        cy.get("[class*=circle_content]").eq(2).as("element3");
        
        // check initial change
        cy.get("@element3").contains("33");
        cy.get("@element3").contains("top");    
        cy.get("@element3").children("[class*=circle_modified]");
        cy.get("@element2").should("not.contain", "top");
        cy.get("@element1").should("not.contain", "top");
        
        cy.wait(Delay.Medium);
        
        // check delayed change
        cy.get("@element3").children("[class*=circle_default]");        
        
        // check whole stack
        cy.get("[class*=circle_content]").should("have.length", 3).each(
          ($el, index) => {
            cy.wrap($el).children("[class*=circle_default]");
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
        cy.get("input").type("12");
        cy.get('[data-testid="push-button"]').click();
        cy.wait(Delay.Medium);
        cy.get("input").type("34");
        cy.get('[data-testid="push-button"]').click();
        cy.wait(Delay.Medium);
        cy.get("input").type("56");
        cy.get('[data-testid="push-button"]').click();
        cy.wait(Delay.Medium);
        
        // remove first element
        cy.get('[data-testid="pop-button"]').click();
        cy.get("[class*=circle_content]").first().as("element1");
        cy.get("[class*=circle_content]").eq(1).as("element2");
        cy.get("[class*=circle_content]").eq(2).as("element3");
        
        // check initial change
        cy.get("@element3").contains("56");
        cy.get("@element3").should("not.contain", "top");
        cy.get("@element3").children("[class*=circle_changing]");
        
        cy.wait(Delay.Medium);
        
        // check delayed change
        cy.get("@element3").should("not.exist");
        cy.get("@element2").contains("top");
        
        // remove second element
        cy.get('[data-testid="pop-button"]').click();
        
        // check initial change
        cy.get("@element2").contains("34");
        cy.get("@element2").should("not.contain", "top");
        cy.get("@element2").children("[class*=circle_changing]");
        
        cy.wait(Delay.Medium);
        
        // check delayed change
        cy.get("@element2").should("not.exist");
        cy.get("@element1").contains("top");
        
        // remove third element
        cy.get('[data-testid="pop-button"]').click();
        
        // check initial change
        cy.get("@element1").contains("12");
        cy.get("@element1").should("not.contain", "top");
        cy.get("@element1").children("[class*=circle_changing]");
        
        cy.wait(Delay.Medium);
        
        // check delayed change
        cy.get("[class*=circle_content]").should("have.length", 0);
      }
    );    
    
    it(
      "should clear the queue correctly", () => {
          
          // add elements to clear them later
          for (let i = 0; i < 3; i++) {
            cy.get("input").type("333");
            cy.get('[data-testid="push-button"]').click();
            cy.wait(Delay.Medium);
          };
          
          // clear the stack
          cy.get('[data-testid="clear-button"]').click();
          
          // check whole stack
          cy.get("[class*=circle_content]").should("have.length", 0);
      }
    );
  }
);