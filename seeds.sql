INSERT INTO departments (dep_name)
VALUES ("Intro to JavaScript"),
       ("Data Science"),
       ("Linear Algebra"),
       ("History of the Internet"),
       ("Machine Learning"),
       ("Game Design"),
       ("Cloud Development");
       
INSERT INTO roles (title, salary, department_id)
VALUES ("Intern", 1000, 1),
       ("Team Member", 2000, 2),
       ("Janitor", 3000, 3),
       ("Manager",2500, 4),
       ("General Manager", 1500, 5),
       ("CEO", 2500 , 6),
       ("Cordinator", 3000, 5);

INSERT INTO employees (first_name, last_name, manager_id,role_id)
VALUES ("Keng", "Fong",13, 3),
       ("Alex","Wong", 25, 5),
       ("Jason","Lu", 31, 6),
       ("Daniel","Bach",42, 5),
       ("Amy","Wu", 42, 2),
       ("Jessica","Ying" ,11 , 1),
       ("Emily","Dao", 1, 2);