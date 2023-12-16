'use client'
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import {toast} from 'react-toastify';
import {mutate} from 'swr';
interface Iprops{
    showModalEdit: boolean;
    setShowModalEdit: (value: boolean) => void;
    blog: ( IBlog | null) ;
    setBlog: (value: IBlog | null) => void;
}
function EditModal(props: Iprops) {
    const { showModalEdit, setShowModalEdit,blog,setBlog } = props;
    const [title, setTitle] = useState<string>('');
    const [author, setAuthor] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [id, setId] = useState<number>(0);

       useEffect(() => {
        if(blog&& blog.id){
            setId(blog.id);
            setTitle(blog.title);
            setAuthor(blog.author);
            setContent(blog.content);
        }
    },[blog])

        const handleSubmitEditedBlog = () => {
            if(!title){
                toast.error('Title is required !');
                return ;
            }
            if(!author){
                toast.error('Author is required !');
                return ;
            }
            if(!content){
                toast.error('Content is required !');
                return ;
            }
            fetch(`http://localhost:8000/blogs/${id}`, {
                method: 'PUT',
                headers: {
                  'Accept': 'application/json, text/plain, */*',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({title,author,content})
              })
            .then(res => res.json())
            .then(res => {
                if(res){

                toast.warning('Edit blog success !')
                handleCloseModal();
                mutate('http://localhost:8000/blogs')
                }
            })
        }

        const handleCloseModal = () => {
            setTitle('');
            setAuthor('');
            setContent('');
            setBlog(null);
            
                       setShowModalEdit(false)
        }   
  return (
    <>
   

      <Modal show={showModalEdit} onHide={()=> handleCloseModal()}>
        <Modal.Header closeButton>
          <Modal.Title>Edit blog {id}</Modal.Title>
        </Modal.Header>
        <Modal.Body> <Form>
      <Form.Group className="mb-3" >
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" placeholder="..." 
            onChange={(e)=> setTitle(e.target.value)}
            value={title}
            />
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>Author</Form.Label>
        <Form.Control type="text" placeholder="..." 
            onChange={(e)=> setAuthor(e.target.value)}
            value={author}
            />
        
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>Content</Form.Label>
        <Form.Control as="textarea" rows={3} 
            onChange={(e)=> setContent(e.target.value)}
            value={content}
        />
      </Form.Group>
    </Form></Modal.Body>
        <Modal.Footer> 
          <Button variant="secondary" onClick={()=> handleCloseModal()}>
            Close
          </Button>
          <Button variant="primary"  onClick={()=>handleSubmitEditedBlog()}>
            Save 
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditModal;