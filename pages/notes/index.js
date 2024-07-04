import dynamic from "next/dynamic";
import {
  Flex,
  Grid,
  GridItem,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Heading,
  Text,
  Button,
  Box,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import NoteForm from "@/components/modals/NoteForm";
import ConfirmModal from "@/components/modals/ConfirmModal";

const LayoutComponent = dynamic(() => import("@/layout"));

export default function Notes({ initialNotes }) {
  const [isLoading, setIsLoading] = useState(false);
  const [notes, setNotes] = useState(initialNotes);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenConfirm,
    onOpen: onOpenConfirm,
    onClose: onCloseConfirm,
  } = useDisclosure();
  const [selectedNote, setSelectedNote] = useState(null);
  const [deleteNoteId, setDeleteNoteId] = useState(null);

  const HandleDelete = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/notes/${deleteNoteId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        const updatedNotes = notes.filter((note) => note.id !== deleteNoteId);
        setNotes(updatedNotes);
      }
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
    onCloseConfirm();
  };

  const handleEdit = (note) => {
    setSelectedNote(note);
    onOpen();
  };

  return (
    <LayoutComponent metaTitle="Notes">
      <Box padding="5">
        <Flex justifyContent="end">
          <Button colorScheme="blue" onClick={() => handleEdit(null)}>
            Add Notes
          </Button>
        </Flex>
        {isLoading && (
          <Flex justifyContent="center" alignItems="center" h="100vh">
            <Spinner />
          </Flex>
        )}
        <Flex>
          <Grid templateColumns="repeat(4, 1fr)" gap={5}>
            {notes?.data.map((item) => (
              <GridItem key={item.id}>
                <Card>
                  <CardHeader>
                    <Heading>{item.title}</Heading>
                  </CardHeader>
                  <CardBody>
                    <Text>{item.description}</Text>
                  </CardBody>
                  <CardFooter
                    justify="space-between"
                    flexWrap="wrap"
                    sx={{
                      "& > button": {
                        minW: "136px",
                      },
                    }}
                  >
                    <Button
                      onClick={() => handleEdit(item)}
                      flex="1"
                      variant="ghost"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => {
                        setDeleteNoteId(item.id);
                        onOpenConfirm();
                      }}
                      flex="1"
                      colorScheme="red"
                    >
                      Delete
                    </Button>
                  </CardFooter>
                </Card>
              </GridItem>
            ))}
          </Grid>
        </Flex>
      </Box>
      <NoteForm
        isOpen={isOpen}
        onClose={onClose}
        note={selectedNote}
        onSubmit={(savedNote) => {
          if (selectedNote) {
            setNotes(
              notes.map((note) => (note.id === savedNote.id ? savedNote : note))
            );
          } else {
            setNotes([...notes, savedNote]);
          }
          onClose();
        }}
      />
      <ConfirmModal
        isOpen={isOpenConfirm}
        onClose={onCloseConfirm}
        onConfirm={HandleDelete}
        title="Delete Note"
        message="Are you sure you want to delete this note?"
      />
    </LayoutComponent>
  );
}

// Using getServerSideProps
export async function getServerSideProps() {
  const res = await fetch("https://service.pace-unv.cloud/api/notes");
  const notes = await res.json();

  return {
    props: {
      initialNotes: notes,
    },
  };
}
