import dynamic from "next/dynamic";
import {
  Flex,
  Grid,
  GridItem,
  Card,
  Heading,
  Text,
  Button,
  Box,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
const LayoutComponent = dynamic(() => import("@/layout"));

export default function EditNotes() {
  const router = useRouter();
  const { id } = router.query;
  const [notes, setNotes] = useState();

  const handleSave = async () => {
    const res = await fetch(
      `https://service.pace-unv.cloud/api/notes/update/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(notes),
      }
    );
    const data = await res.json();
    if (data) {
      router.push("/notes");
    }
  };

  useEffect(() => {
    async function fetchingData() {
      const res = await fetch(`https://service.pace-unv.cloud/api/notes/${id}`);
      const listNotes = await res.json();
      setNotes(listNotes?.data);
    }
    fetchingData();
  }, [id]);

  return (
    <>
      <LayoutComponent metaTitle="Notes">
        <Card margin="5" padding="5">
          <Heading>Edit Notes</Heading>
          <Grid gap="5">
            <GridItem>
              <Text>Title</Text>
              <Input
                placeholder="Title"
                type="text"
                value={notes?.title}
                onChange={(event) =>
                  setNotes({ ...notes, title: event.target.value })
                }
              />
            </GridItem>
            <GridItem>
              <Text>Description</Text>
              <Textarea
                placeholder="Description"
                value={notes?.description}
                onChange={(event) =>
                  setNotes({ ...notes, description: event.target.value })
                }
              />
            </GridItem>
            <GridItem>
              <Button onClick={() => handleSave()} colorScheme="blue">
                Save
              </Button>
            </GridItem>
          </Grid>
        </Card>
      </LayoutComponent>
    </>
  );
}
