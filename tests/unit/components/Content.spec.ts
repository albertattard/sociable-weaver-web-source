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

  it("displays the create with the working directory", async () => {
    /* Given */
    const chapter = {
      entries: [
        {
          type: "create",
          workingDirectory: "hello-world",
          parameters: ["HelloWorld", "#!/usr/bin/java --source 17"],
        },
      ],
    };

    /* When */
    const wrapper = mount(Content, { props: { chapter } });
    await flushPromises();

    /* Then */
    expect(wrapper.find("div[class=filePath]").text()).toEqual(
      "Create the file: hello-world/HelloWorld, with the following contents"
    );
    expect(wrapper.find("pre[class=content]").text()).toEqual("#!/usr/bin/java --source 17");
  });

  it("displays the docker tag and push with the working directory", async () => {
    /* Given */
    const chapter = {
      entries: [
        {
          type: "docker-tag-and-push",
          workingDirectory: "hello-world",
          parameters: ["hello-world:v8.0.4", "${DOCKER_USERNAME}/hello-world:v8.0.4"],
        },
      ],
    };

    /* When */
    const wrapper = mount(Content, { props: { chapter } });
    await flushPromises();

    /* Then */
    expect(wrapper.find("pre").text()).toContain("hello-world $ docker tag hello-world:v8.0.4 ${DOCKER_USERNAME}/hello-world:v8.0.4");
    expect(wrapper.find("pre").text()).toContain("hello-world $ docker push ${DOCKER_USERNAME}/hello-world:v8.0.4");
  });

  it("displays the download with the working directory", async () => {
    /* Given */
    const chapter = {
      entries: [
        {
          type: "download",
          workingDirectory: "hello-world",
          parameters: ["https://github.com/albertattard/programming--hello-world-jar-demo/releases/download/v1.0.0/hello-world-jar-demo.jar", "hello-world-jar-demo.jar"],
        },
      ],
    };

    /* When */
    const wrapper = mount(Content, { props: { chapter } });
    await flushPromises();

    /* Then */
    expect(wrapper.find("pre").text()).toEqual("hello-world $ curl --location https://github.com/albertattard/programming--hello-world-jar-demo/releases/download/v1.0.0/hello-world-jar-demo.jar --output hello-world-jar-demo.jar");
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