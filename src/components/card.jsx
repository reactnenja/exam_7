import { Heading, Image, Stack, Text } from "@chakra-ui/react";
import "../sass/card.scss";

import { useNavigate } from "react-router-dom";
const ProductCard = ({ data }) => {
  const root = useNavigate();

  return (
    <>
      {data?.data.map((el, i) => (
        <div
          onClick={() => root(`/playlist/${el?.id}?type=${data?.type}`)}
          key={i}
          className="card"
        >
          <div>
            <Image
              src={el.images?.map((el) => el?.url)}
              alt="Green double couch with wooden legs"
              borderRadius="lg"
              className="card-image"
            />

            <Stack>
              <Heading className="hedding">
                {el?.name?.length > 15
                  ? el.name?.substring(0, 15) + "..."
                  : el.name}
              </Heading>
              <Text>
                {el.description?.length > 40
                  ? el.description?.substring(0, 39) + "..."
                  : el.description}
              </Text>
            </Stack>
          </div>
        </div>
      ))}
    </>
  );
};

export default ProductCard;
