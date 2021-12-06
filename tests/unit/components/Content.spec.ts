import Content from "@/components/Content.vue";
import { flushPromises, mount } from "@vue/test-utils";

describe("Content component", () => {
  it("displays the chapter", async () => {
    /* Given */
    const chapter = {
      entries: [
        {
          type: "chapter",
          parameters: ["Hello world"],
        },
      ],
    };

    /* When */
    const wrapper = mount(Content, { props: { chapter } });
    await flushPromises();

    /* Then */
    expect(wrapper.text()).toEqual("Hello world");
  });

  it("displays the command without working directory", async () => {
    /* Given */
    const chapter = {
      entries: [
        {
          type: "command",
          parameters: ["java", "-jar", "hello-world.jar"],
        },
      ],
    };

    /* When */
    const wrapper = mount(Content, { props: { chapter } });
    await flushPromises();

    /* Then */
    expect(wrapper.find("pre").text()).toEqual("$ java -jar hello-world.jar");
  });

  it("displays the command with working directory", async () => {
    /* Given */
    const chapter = {
      entries: [
        {
          type: "command",
          workingDirectory: "hello-world",
          parameters: ["java", "-jar", "hello-world.jar"],
        },
      ],
    };

    /* When */
    const wrapper = mount(Content, { props: { chapter } });
    await flushPromises();

    /* Then */
    expect(wrapper.find("pre").text()).toEqual("hello-world $ java -jar hello-world.jar");
  });

  it("displays the markdown as HTML", async () => {
    /* Given */
    const chapter = {
      entries: [
        {
          type: "markdown",
          parameters: ["**Hello world**"],
        },
      ],
    };

    /* When */
    const wrapper = mount(Content, { props: { chapter } });
    await flushPromises();

    /* Then */
    expect(wrapper.find("strong").text()).toEqual("Hello world");
  });

  it("displays a message indicating that this type is not yet supported", async () => {
    /* Given */
    const type = "unsupported-type";
    const chapter = { entries: [{ type }] };

    /* When */
    const wrapper = mount(Content, { props: { chapter } });
    await flushPromises();

    /* Then */
    expect(wrapper.text()).toEqual(`Do not know how to renter entries of type: ${type}`);
  });
});
