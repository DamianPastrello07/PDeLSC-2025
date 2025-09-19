import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

export default function AddSkillModal({ setSkills }) {
  const [show, setShow] = useState(false);
  const [skillName, setSkillName] = useState('');
  const [skillLevel, setSkillLevel] = useState(85);
  const [skillColor, setSkillColor] = useState('primary');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const addSkill = () => {
    if (!skillName.trim()) return alert('Completa el nombre de la habilidad');
    
    setSkills(prev => [
      ...prev, 
      { id: prev.length ? Math.max(...prev.map(s=>s.id))+1 : 1, name: skillName, level: parseInt(skillLevel), color: skillColor }
    ]);

    setSkillName('');
    setSkillLevel(85);
    setSkillColor('primary');
    handleClose();
  };

  return (
    <>
      <Button variant="primary" size="sm" className="ms-2" onClick={handleShow}>
        <i className="fas fa-plus"></i> Añadir
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Añadir Nueva Habilidad</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nombre de la Habilidad</Form.Label>
              <Form.Control type="text" value={skillName} onChange={(e)=>setSkillName(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Nivel (1-100)</Form.Label>
              <Form.Control type="number" min="1" max="100" value={skillLevel} onChange={(e)=>setSkillLevel(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Color</Form.Label>
              <Form.Select value={skillColor} onChange={(e)=>setSkillColor(e.target.value)}>
                <option value="primary">Azul</option>
                <option value="secondary">Gris</option>
                <option value="success">Verde</option>
                <option value="danger">Rojo</option>
                <option value="warning">Amarillo</option>
                <option value="info">Celeste</option>
                <option value="dark">Negro</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
          <Button variant="primary" onClick={addSkill}>Añadir Habilidad</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
