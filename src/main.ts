import { z } from "zod";

const UserSchema = z.object({
  id: z.string().or(z.number()),
  username: z.string().min(3),
  age: z.number().gt(0).optional(),
  birthday: z.date().optional(),
  isDev: z.boolean().default(true),
  site: z.string().url().optional(),
  hobby: z.enum(["Music", "Art", "Travel"]),
  coords: z.tuple([z.number(), z.number(), z.number()]),
});

// type User = {
//   username: string;
// };

type User = z.infer<typeof UserSchema>;

const user: User = {
  id: 1,
  username: "Mario",
  site: "https://mariolazzari.it",
  hobby: "Art",
  isDev: true,
  coords: [1, 2, 3],
};
console.log(UserSchema.parse(user));

// safe parse
const mario = {
  username: "Mario",
};
console.log(UserSchema.safeParse(mario));

console.log("User shape:", UserSchema.shape);

const UserMapSchema = z.record(z.string(), z.number());

type UserMap = z.infer<typeof UserMapSchema>;

const userMap: UserMap = {
  Mario: 1,
};

console.log(UserMapSchema.safeParse(userMap));
