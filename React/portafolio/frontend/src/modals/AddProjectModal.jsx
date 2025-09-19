import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

export default function AddProjectModal({ setProjects }) {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('https://cdn.pixabay.com/photo/2016/11/19/15/32/code-1839877_1280.jpg');
  const [repoUrl, setRepoUrl] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const addProject = () => {
    if (!title.trim() || !description.trim() || !repoUrl.trim()) return alert('Completa todos los campos obligatorios');

    setProjects(prev => [
      ...prev,
      { id: prev.length ? Math.max(...prev.map(p=>p.id))+1 : 1, title, description, image, repoUrl }
    ]);

    setTitle('');
    setDescription('');
    setImage('https://cdn.pixabay.com/photo/2016/11/19/15/32/code-1839877_1280.jpg');
    setRepoUrl('');
    handleClose();
  };

  return (
    <>
      <Button variant="primary" size="sm" className="ms-2" onClick={handleShow}>
        <i className="fas fa-plus"></i> Añadir
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Añadir Nuevo Proyecto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Título</Form.Label>
              <Form.Control type="text" value={title} onChange={(e)=>setTitle(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control as="textarea" rows={3} value={description} onChange={(e)=>setDescription(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>URL de Imagen</Form.Label>
              <Form.Control type="text" value={image} onChange={(e)=>setImage(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>URL del Repositorio</Form.Label>
              <Form.Control type="text" value={repoUrl} onChange={(e)=>setRepoUrl(e.target.value)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
          <Button variant="primary" onClick={addProject}>Añadir Proyecto</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
