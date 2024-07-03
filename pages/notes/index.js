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
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useQueries } from "@/hooks/useQueries";
import fetcher from "@/utils/fetcher";
import useSWR from "swr";
const LayoutComponent = dynamic(() => import("@/layout"));

export default function Notes() {
  // const { data, isLoading } = useQueries({
  //   prefixurl: "https://service.pace-unv.cloud/api/notes",
  // });
  const { data, isLoading } = useSWR(
    "https://service.pace-unv.cloud/api/notes",
    fetcher,
    { revalidateOnFocus: true }
  );
  const router = useRouter();
  const [notes, setNotes] = useState();

  const HandleDelete = async (id) => {
    const res = await fetch(
      `https://service.pace-unv.cloud/api/notes/delete/${id}`,
      {
        method: "DELETE",
      }
    );
    const data = await res.json();
    if (data) {
      const res = await fetch("https://service.pace-unv.cloud/api/notes");
      const listNotes = await res.json();
      setNotes(listNotes);
    }
  };

  return (
    <>
      <LayoutComponent metaTitle="Notes">
        <Box padding="5">
          <Flex justifyContent="end">
            <Button
              colorScheme="blue"
              onClick={() => router.push("/notes/add")}
            >
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
              {data?.data?.map((item) => (
                <GridItem>
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
                        onClick={() => router.push(`/notes/edit/${item?.id}`)}
                        flex="1"
                        variant="ghost"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => HandleDelete(item?.id)}
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
      </LayoutComponent>
    </>
  );
}

// export async function getStaticProps() {
//   const res = await fetch("https://service.pace-unv.cloud/api/notes");
//   const notes = await res.json();
//   return {
//     props: { notes },
//     revalidate: 10,
//   };
// }
