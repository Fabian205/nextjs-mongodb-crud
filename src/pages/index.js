import { useRouter } from "next/router";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
} from "semantic-ui-react";


export default function HomePage({ tasks }) {
  //console.log(tasks)
  const router = useRouter();
  
  if (tasks.length === 0)
    return (   
      <Grid
        centered
        verticalAlign="middle"
        columns="1"
        style={{ height: "80vh" }}
      >
        <Grid.Row>
          <Grid.Column textAlign="center">
            <h1>There are no tasks yet</h1>
            <img
              src="https://cdni.iconscout.com/illustration/premium/thumb/no-wifi-signal-4516678-3749030.png"
              alt="No tasks yet"
            />
            <div>
              <Button 
              primary
              onClick={() => router.push("/tasks/new")}
              >Create Task</Button>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  //console.log(tasks)
  //Render a list of tasks
  return (
    <Container style={{padding: '20px'}}>
      <Card.Group itemsPerRow={4}>
        {tasks.map((task) => (
          <Card key={task._id}>
            <CardContent>
              <CardHeader>{task.title}</CardHeader>
              <p>{task.description}</p>
            </CardContent>
            <CardContent extra>
              <Button primary onClick={() => router.push(`/tasks/${task._id}`)}>View</Button>
              <Button primary
              onClick={()=>router.push(`/tasks/${task._id}/edit`)}
              >Edit</Button>
            </CardContent>
          </Card>
        ))}
      </Card.Group>
    </Container>
  );
}
export const getServerSideProps = async (ctx) => {
  const res = await fetch("http://localhost:3000/api/tasks");
  const tasks = await res.json();
  return {
    props: {
      tasks,
    },
  };
};

