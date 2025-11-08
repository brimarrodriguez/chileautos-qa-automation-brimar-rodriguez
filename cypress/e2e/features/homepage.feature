Feature: HomePage ChileAutos

  Background:
    Given I open the login page

  @smoke @homepage
  Scenario: TC001 - Verificar acceso y disponibilidad de homepage de ChileAutos
    Then I see content of Home Page

  @smoke @login @register @sell
  Scenario Outline: <id-test> - Validar que desde homepage se redirige correctamente al presionar "<button>"
    When I save old url to compare later
    Then I click on the "<button>" button and get response
    Then I can see the new url is different from the old one
    Then I validate that new URL contains ChileAutos URL

    Examples:
      | id-test | button               |
      | TC002   | Ingresar/Registrarse |
      | TC003   | Publicar auto        |
      | TC004   | Vende tu auto        |
      | TC005   | Ver autos usados     |
      | TC006   | Transferir auto      |

  @smoke @filter
  Scenario Outline: <id-test> - Validar que resultados de la búsqueda coincida con los parámetros ingresados
    When I apply the "<filter>" search filters
    Then I click on Buscar button
#    And I validate that all results

    Examples:
      | id-test | filter |
      | TC007   | Toyota |
      | TC008   | BMW    |

  @smoke @all-cars
  Scenario: TC009 - Verificar que el usuario es redirigido correctamente al seleccionar "Todos los Autos" desde el menú "Compra"
    When I save old url to compare later
    When I click on the "Compra" menu
    And I click on the "Todos los Autos" option
    Then I can see the new url is different from the old one
    Then I validate that new URL contains ChileAutos URL
