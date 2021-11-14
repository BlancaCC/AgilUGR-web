CREATE DATABASE agil; 
CREATE TABLE agil.webState (
    id int auto_increment,  
    view VARCHAR(100),
    counter int, 
    action VARCHAR(100), 
    indice_tiempo int, 
    time_action VARCHAR(20), 
    ultima_modificacion timestamp, 
    primary key(id)
); 

INSERT INTO agil.webState(view, ultima_modificacion) VALUES 
('profile', CURRENT_TIMESTAMP(1));

UPDATE agil.webState SET 
    view = 'focus', 
    counter = 1, 
    indice_tiempo = 1,
    action = 'ninguna',
    time_action = 'EN_MOVIMIENTO',
    ultima_modificacion = CURRENT_TIMESTAMP(2)
    WHERE id=1;

SELECT * FROM agil.webState; 