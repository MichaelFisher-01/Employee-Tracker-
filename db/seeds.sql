INSERT INTO departments(dept_name)
VALUES ("Engineering"),
    ("Operations"),
    ("Marketing"),
    ("Sales");

INSERT INTO ROLES (title, salary, department_id)
VALUES ("Developer", 85000, 1),
    ("Sr Developer", 100000, 1),
    ("CEO", 150000,2),
    ("Regional Manager", 70000,2),
    ("Customer Service Rep", 55000, 2),
    ("Customer Service Manager", 75000,2),
    ("Advertising Specliast", 67000,3),
    ("Catch Phrase Creator", 100000,3),
    ("Sales Assocaite", 65000,4),
    ("Sales Manager", 85000,4);
INSERT INTO employees(first_name, last_name, roles_id, manager_id)
VALUES ("Robert", "California", 3, NULL),
    ("Michael", "Scott", 4, 1),
    ("Jim", "Halpert", 9, 2),
    ("Dwight","Schrute", 10, 2),
    ("Stanley", "Hudson", 9, 2),
    ("Philis", "Vance", 9, 2),
    ("Gabe", "Lewis", 8, 1),
    ("Kelly", "Kapoor", 5, 2),
    ("Ryan", "Howard", 6, 2),
    ("Kevin", "Malone", 7, 2),
    ("Sadiq", "Last-Name", 1, 2),
    ("Nick", "Last-Name", 2, 2);
