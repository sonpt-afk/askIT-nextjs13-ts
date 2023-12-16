'use client'
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import CreateModal from './create.modal';
import EditModal from './edit.modal';
import { useState } from 'react';
import Link from 'next/link';
import {toast} from 'react-toastify';
import {mutate} from 'swr';
interface IProps {
  blogs: IBlog[]
}

function BasicExample(props: IProps) {
  const {blogs } = props;
  const [showModalCreate, setShowModalCreate] = useState<boolean>(false);
  const [showModalEdit, setShowModalEdit] = useState<boolean>(false);
  const [blog, setBlog] = useState<IBlog | null>(null);

  return (
    <>
    <div className='mb-3' style={{ display: 'flex',justifyContent:'space-between'}}>
      <h3>Table Blogs</h3>
      <Button variant='secondary' onClick={()=> setShowModalCreate(true)}>Add New</Button>
    </div>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>No</th>
          <th>Title</th>
          <th>Author</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {blogs?.map(item=>{
          return (
            <tr key={item.id}>
              <td>{item.id}</td>

              <td>{item.title}</td>
              <td>{item.author}</td>
              <td>
                  <Link className='btn btn-primary' href={`/blogs/${item.id}`}>
                    View
                    </Link>
                <Button variant='warning' className='mx-3' 
                onClick={()=> {
                  setShowModalEdit(true)
                  setBlog(item)
                }}>Edit</Button>
                <Button variant='danger'
                onClick={()=> {
                  if (confirm(`Do you want to delete this blog(id= ${item.id})`) == true) {
                    fetch(`http://localhost:8000/blogs/${item.id}`, {
                      method: 'DELETE',
                      headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                      },
                    }).then(res => {
                      if(res){
      
                      toast.warning('Delete blog success !')
                      mutate('http://localhost:8000/blogs')
                      }
                  })

                  } else {
                    return;
                  }
                }}
                >Delete</Button>
                </td>
            </tr>
          )
        })}
      
        
      </tbody>
    </Table>
    <CreateModal
    showModalCreate={showModalCreate}
    setShowModalCreate={setShowModalCreate}
    />
    <EditModal
    showModalEdit={showModalEdit}
    setShowModalEdit={setShowModalEdit}
    blog={blog}
    setBlog={setBlog}
    />
    </>
  );
}

export default BasicExample;